'use client'

import { useReadContract } from 'wagmi'
import { contractConfig } from '@/lib/contracts'
import { WalletConnect } from '@/components/WalletConnect'
import { useParams } from 'next/navigation'

export default function ResultsPage() {
  const params = useParams()
  const proposalId = parseInt(params.id as string)

  const { data: proposal, isLoading, error } = useReadContract({
    ...contractConfig.governance,
    functionName: 'getProposal',
    args: [proposalId],
  })

  if (isLoading) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-stone-600">Loading results...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !proposal) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="text-orange-500 hover:opacity-80 mb-8 inline-block">← Back to Home</a>
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            Failed to load proposal results. It may not exist yet.
          </div>
        </div>
      </main>
    )
  }

  const [id, title, description, proposer, startTime, endTime, yesVotes, noVotes, abstainVotes, executed, passed] = proposal as any
  
  const totalVotes = Number(yesVotes) + Number(noVotes) + Number(abstainVotes)
  const yesPercentage = totalVotes > 0 ? (Number(yesVotes) / totalVotes * 100) : 0
  const noPercentage = totalVotes > 0 ? (Number(noVotes) / totalVotes * 100) : 0
  const abstainPercentage = totalVotes > 0 ? (Number(abstainVotes) / totalVotes * 100) : 0

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <a href="/" className="text-orange-500 hover:opacity-80">← Back to Home</a>
            <a href="/proposals" className="text-stone-600 hover:text-stone-900">Proposals</a>
          </div>
          <WalletConnect />
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            executed 
              ? (passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')
              : 'bg-blue-100 text-blue-800'
          }`}>
            {executed ? (passed ? 'PASSED' : 'REJECTED') : 'IN PROGRESS'}
          </span>
          <span className="text-sm text-stone-500">Proposal #{id}</span>
        </div>
        
        <h1 className="text-4xl font-bold text-stone-900 mb-4">{title}</h1>
        <p className="text-sm text-stone-500 mb-8">
          Proposed by {proposer?.slice(0, 6)}...{proposer?.slice(-4)}
        </p>
        
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-2">Description</h2>
          <p className="text-stone-600 whitespace-pre-wrap">{description}</p>
        </div>
        
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-900 mb-2">Confidential Voting Results</h2>
          <p className="text-stone-600 text-sm">
            Individual votes remain encrypted. Only the final outcome is revealed publicly.
          </p>
        </div>
        
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-6">Voting Results</h2>
          
          <div className="space-y-6">
            {/* Yes Votes */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-stone-900">Yes</span>
                <span className="text-stone-600">{yesVotes} votes ({yesPercentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all"
                  style={{ width: `${yesPercentage}%` }}
                />
              </div>
            </div>
            
            {/* No Votes */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-stone-900">No</span>
                <span className="text-stone-600">{noVotes} votes ({noPercentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full transition-all"
                  style={{ width: `${noPercentage}%` }}
                />
              </div>
            </div>
            
            {/* Abstain Votes */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-stone-900">Abstain</span>
                <span className="text-stone-600">{abstainVotes} votes ({abstainPercentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-4">
                <div 
                  className="bg-yellow-500 h-4 rounded-full transition-all"
                  style={{ width: `${abstainPercentage}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-stone-200">
            <div className="flex justify-between">
              <span className="text-stone-600">Total Votes</span>
              <span className="font-bold text-stone-900">{totalVotes}</span>
            </div>
          </div>
        </div>
        
        {executed && (
          <div className={`border rounded-xl p-6 ${
            passed 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <h3 className={`text-xl font-bold mb-2 ${
              passed ? 'text-green-900' : 'text-red-900'
            }`}>
              {passed ? '✓ Proposal Passed' : '✗ Proposal Rejected'}
            </h3>
            <p className={passed ? 'text-green-700' : 'text-red-700'}>
              {passed 
                ? 'The proposal has been approved and will be executed.'
                : 'The proposal did not receive enough votes to pass.'
              }
            </p>
          </div>
        )}
      </div>
    </main>
  );
}