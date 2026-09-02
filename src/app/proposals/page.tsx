'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { contractConfig } from '@/lib/contracts'
import { WalletConnect } from '@/components/WalletConnect'

export default function ProposalsPage() {
  const [proposalCount, setProposalCount] = useState(0)
  
  // Get total proposal count
  const { data: totalProposals } = useReadContract({
    ...contractConfig.governance,
    functionName: 'proposalCount',
  })

  // For now, we'll just show a static list since we can't easily get all proposals without
  // a more complex contract structure. In a production app, you'd want to add a function
  // to get all proposal IDs or use an event indexer.

  const demoProposals = [
    { id: 1, title: 'Approve Community Moderator', status: 'Active', votes: 12 },
    { id: 2, title: 'Update Governance Rules', status: 'Ended', votes: 45 },
    { id: 3, title: 'Fund New Feature Development', status: 'Active', votes: 8 },
  ]

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-stone-900 mb-2">Governance Proposals</h1>
            <p className="text-lg text-stone-600">Vote on community decisions confidentially</p>
          </div>
          <WalletConnect />
        </div>
        
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-900 mb-2">🔒 Confidential Voting</h2>
          <p className="text-stone-600 text-sm">
            Your votes remain encrypted throughout the entire process. Only the final outcome is revealed publicly.
          </p>
        </div>
        
        <div className="space-y-4">
          {demoProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white border border-stone-200 rounded-xl p-6 hover:border-orange-300 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-1">{proposal.title}</h3>
                  <p className="text-sm text-stone-500">Proposal #{proposal.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  proposal.status === 'Active' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {proposal.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-stone-600">
                  <span className="font-medium">{proposal.votes}</span> votes cast
                </div>
                <a 
                  href={`/proposal/${proposal.id}`}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  {proposal.status === 'Active' ? 'Vote Now' : 'View Results'}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-stone-500">
            Total proposals created: {totalProposals ? Number(totalProposals) : 0}
          </p>
        </div>
      </div>
    </main>
  );
}