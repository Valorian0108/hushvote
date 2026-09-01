'use client'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { contractConfig } from '@/lib/contracts'
import { useState } from 'react'

export function VotingInterface({ proposalId }: { proposalId: number }) {
  const { address, isConnected } = useAccount()
  const { writeContract } = useWriteContract()
  const [selectedVote, setSelectedVote] = useState<boolean | null>(null)
  const [isVoting, setIsVoting] = useState(false)

  // Check if user has voted
  const { data: hasVoted } = useReadContract({
    ...contractConfig.governance,
    functionName: 'hasUserVoted',
    args: [proposalId, address || '0x0'],
  })

  // Check if user is eligible
  const { data: isEligible } = useReadContract({
    ...contractConfig.governance,
    functionName: 'isVoterEligible',
    args: [proposalId, address || '0x0'],
  })

  const handleVote = async (vote: boolean) => {
    if (!isConnected || !address) return
    
    setIsVoting(true)
    try {
      await writeContract({
        ...contractConfig.governance,
        functionName: 'vote',
        args: [proposalId, vote],
      })
      setSelectedVote(vote)
    } catch (error) {
      console.error('Voting error:', error)
    } finally {
      setIsVoting(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-6 text-center">
        <p className="text-stone-600 mb-4">Connect your wallet to vote</p>
      </div>
    )
  }

  if (hasVoted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <p className="text-green-800 font-medium">✓ You have already voted on this proposal</p>
      </div>
    )
  }

  if (!isEligible) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <p className="text-yellow-800 font-medium">⚠ You are not eligible to vote on this proposal</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-stone-900 mb-4">Cast Your Vote</h3>
      <div className="flex gap-4">
        <button
          onClick={() => handleVote(true)}
          disabled={isVoting}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            selectedVote === true
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isVoting && selectedVote === true ? 'Voting...' : 'Yes'}
        </button>
        <button
          onClick={() => handleVote(false)}
          disabled={isVoting}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            selectedVote === false
              ? 'bg-red-500 text-white'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isVoting && selectedVote === false ? 'Voting...' : 'No'}
        </button>
      </div>
      <p className="text-xs text-stone-500 mt-4 text-center">
        Your vote will be encrypted using FHE technology
      </p>
    </div>
  )
}