'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { contractConfig } from '@/lib/contracts'
import { WalletConnect } from '@/components/WalletConnect'

export default function ProposalsPage() {
  const [proposalCount, setProposalCount] = useState(0)
  
  // Get total proposal count
  const { data: totalProposals, isLoading } = useReadContract({
    ...contractConfig.governance,
    functionName: 'proposalCount',
  })

  const hasProposals = totalProposals && Number(totalProposals) > 0

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <a href="/" className="text-orange-500 hover:opacity-80 mb-2 inline-block">← Back to Home</a>
            <h1 className="text-4xl font-bold text-stone-900 mb-2">Governance Proposals</h1>
            <p className="text-lg text-stone-600">Vote on community decisions confidentially</p>
          </div>
          <WalletConnect />
        </div>
        
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-900 mb-2">Confidential Voting</h2>
          <p className="text-stone-600 text-sm">
            Your votes remain encrypted throughout the entire process. Only the final outcome is revealed publicly.
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-stone-600">Loading proposals...</p>
          </div>
        ) : !hasProposals ? (
          <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-stone-900 mb-2">No Proposals Yet</h3>
            <p className="text-stone-600 mb-6">
              Be the first to create a governance proposal for the community.
            </p>
            <a 
              href="/admin"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Create First Proposal
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {Array.from({ length: Number(totalProposals) }, (_, i) => i + 1).map((id) => (
              <div key={id} className="bg-white border border-stone-200 rounded-xl p-6 hover:border-orange-300 transition-colors animate-scale-in" style={{ animationDelay: `${id * 0.1}s` }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-1">Proposal #{id}</h3>
                    <p className="text-sm text-stone-500">Governance Proposal</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-stone-600">
                    View proposal details
                  </div>
                  <a 
                    href={`/proposal/${id}`}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    View Proposal
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-sm text-stone-500">
            Total proposals created: {totalProposals ? Number(totalProposals) : 0}
          </p>
        </div>
      </div>
    </main>
  );
}