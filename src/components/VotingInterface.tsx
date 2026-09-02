'use client'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { contractConfig } from '@/lib/contracts'
import { useState } from 'react'

export function VotingInterface({ proposalId }: { proposalId: number }) {
  const { address, isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Check if user has voted
  const { data: hasVoted, isLoading: checkingVote } = useReadContract({
    ...contractConfig.governance,
    functionName: 'hasUserVoted',
    args: [proposalId, address || '0x0'],
    query: {
      enabled: !!address,
    },
  })

  // Check if user is eligible
  const { data: isEligible, isLoading: checkingEligibility } = useReadContract({
    ...contractConfig.governance,
    functionName: 'isVoterEligible',
    args: [proposalId, address || '0x0'],
    query: {
      enabled: !!address,
    },
  })

  const handleVote = async (vote: boolean) => {
    if (!isConnected || !address) return
    
    setError(null)
    setSuccess(false)
    
    try {
      await writeContract({
        ...contractConfig.governance,
        functionName: 'vote',
        args: [proposalId, vote],
      })
      setSuccess(true)
    } catch (err) {
      console.error('Voting error:', err)
      setError('Failed to cast vote. Please try again.')
    }
  }

  if (checkingVote || checkingEligibility) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-stone-600">Checking eligibility...</p>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-6 text-center">
        <p className="text-stone-600 mb-4">Connect your wallet to vote</p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <p className="text-green-800 font-medium">✓ Vote cast successfully!</p>
        <p className="text-green-600 text-sm mt-2">Your encrypted vote has been recorded</p>
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
        <p className="text-yellow-600 text-sm mt-2">Contact an admin to grant voting eligibility</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-stone-900 mb-4">Cast Your Vote</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <div className="flex gap-4">
        <button
          onClick={() => handleVote(true)}
          disabled={isPending}
          className="flex-1 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Voting...' : 'Yes'}
        </button>
        <button
          onClick={() => handleVote(false)}
          disabled={isPending}
          className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Voting...' : 'No'}
        </button>
      </div>
      <p className="text-xs text-stone-500 mt-4 text-center">
        Your vote will be encrypted using FHE technology
      </p>
    </div>
  )
}