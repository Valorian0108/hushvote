'use client'

import { useState } from "react";
import { useReadContract } from 'wagmi'
import { contractConfig } from '@/lib/contracts'
import { VotingInterface } from '@/components/VotingInterface'
import { WalletConnect } from '@/components/WalletConnect'
import { useParams } from 'next/navigation'

export default function VotePage() {
  const params = useParams()
  const proposalId = parseInt(params.id as string)
  const [selectedVote, setSelectedVote] = useState<"yes" | "no" | null>(null);

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
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            Failed to load proposal. It may not exist yet.
          </div>
        </div>
      </main>
    )
  }

  const [id, title, description, proposer, startTime, endTime, yesVotes, noVotes, abstainVotes, executed, passed] = proposal as any
  const isActive = !executed && Date.now() / 1000 < Number(endTime)

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <a href={`/proposal/${params.id}`} className="text-orange-500 hover:opacity-80">← Back to Proposal</a>
            <a href="/proposals" className="text-stone-600 hover:text-stone-900">Proposals</a>
          </div>
          <WalletConnect />
        </div>
        
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Cast Your Vote</h1>
        <p className="text-lg text-stone-600 mb-8">Proposal #{id}: {title}</p>
        
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-900 mb-2">Your Eligibility is Checked Privately</h2>
          <p className="text-stone-600 text-sm">
            The community's participation rules can be applied without publishing your reputation score
            or voting influence. Your vote will be encrypted before submission.
          </p>
        </div>
        
        <VotingInterface proposalId={proposalId} />
        
        {!isActive && (
          <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 text-center mt-8">
            <p className="text-stone-600">Voting has ended for this proposal</p>
          </div>
        )}
      </div>
    </main>
  );
}
