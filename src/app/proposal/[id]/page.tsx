'use client'

import { useReadContract } from 'wagmi'
import { contractConfig } from '@/lib/contracts'
import { WalletConnect } from '@/components/WalletConnect'
import { useParams } from 'next/navigation'

export default function ProposalPage() {
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
            <p className="text-stone-600">Loading proposal...</p>
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
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Failed to load proposal #{proposalId}</h3>
            <p className="text-sm mb-4">This proposal may not exist yet or there was an error loading it from the blockchain.</p>
            <div className="flex gap-4">
              <a href="/proposals" className="text-sm underline hover:opacity-80">View All Proposals</a>
              <a href="/admin" className="text-sm underline hover:opacity-80">Create a Proposal</a>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const [id, title, description, proposer, startTime, endTime, yesVotes, noVotes, abstainVotes, executed, passed] = proposal as any

  const isActive = !executed && Date.now() / 1000 < Number(endTime)
  const totalVotes = Number(yesVotes) + Number(noVotes) + Number(abstainVotes)
  const yesPercentage = totalVotes > 0 ? (Number(yesVotes) / totalVotes * 100).toFixed(1) : 0
  const noPercentage = totalVotes > 0 ? (Number(noVotes) / totalVotes * 100).toFixed(1) : 0

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
              : isActive 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
          }`}>
            {executed ? (passed ? 'PASSED' : 'REJECTED') : (isActive ? 'ACTIVE' : 'ENDED')}
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
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{yesVotes}</div>
            <div className="text-sm text-stone-600">Yes ({yesPercentage}%)</div>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{noVotes}</div>
            <div className="text-sm text-stone-600">No ({noPercentage}%)</div>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-600">{abstainVotes}</div>
            <div className="text-sm text-stone-600">Abstain</div>
          </div>
        </div>
        
        {isActive && (
          <a href={`/proposal/${params.id}/vote`} className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:opacity-90">
            Vote on This Proposal →
          </a>
        )}
        
        {!isActive && (
          <a href={`/results/${params.id}`} className="inline-block px-6 py-3 bg-stone-900 text-white rounded-full font-medium hover:opacity-90">
            View Results →
          </a>
        )}
      </div>
    </main>
  );
}
