'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractConfig } from '@/lib/contracts'
import { WalletConnect } from '@/components/WalletConnect'

export default function AdminPage() {
  const { isConnected } = useAccount()
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })
  
  // Proposal creation state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  
  // Reputation granting state
  const [userAddress, setUserAddress] = useState('')
  const [reputationScore, setReputationScore] = useState('')
  const [isGranting, setIsGranting] = useState(false)
  
  // Voter eligibility state
  const [voterAddress, setVoterAddress] = useState('')
  const [proposalId, setProposalId] = useState('')
  const [isAddingVoter, setIsAddingVoter] = useState(false)
  
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      setError('Please connect your wallet first')
      return
    }

    if (!title.trim() || !description.trim()) {
      setError('Please fill in all fields')
      return
    }

    setIsCreating(true)
    setError(null)
    setSuccess(null)

    try {
      await writeContract({
        ...contractConfig.governance,
        functionName: 'createProposal',
        args: [title, description],
      })
      
      setSuccess('Proposal submitted! Waiting for blockchain confirmation...')
      setTitle('')
      setDescription('')
    } catch (err) {
      console.error('Error creating proposal:', err)
      setError('Failed to create proposal. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleGrantReputation = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      setError('Please connect your wallet first')
      return
    }

    if (!userAddress.trim() || !reputationScore.trim()) {
      setError('Please fill in all fields')
      return
    }

    setIsGranting(true)
    setError(null)
    setSuccess(null)

    try {
      await writeContract({
        ...contractConfig.reputation,
        functionName: 'grantReputation',
        args: [userAddress, parseInt(reputationScore)],
      })
      
      setSuccess('Reputation grant submitted! Waiting for blockchain confirmation...')
      setUserAddress('')
      setReputationScore('')
    } catch (err) {
      console.error('Error granting reputation:', err)
      setError('Failed to grant reputation. Please try again.')
    } finally {
      setIsGranting(false)
    }
  }

  const handleAddVoter = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      setError('Please connect your wallet first')
      return
    }

    if (!voterAddress.trim() || !proposalId.trim()) {
      setError('Please fill in all fields')
      return
    }

    setIsAddingVoter(true)
    setError(null)
    setSuccess(null)

    try {
      await writeContract({
        ...contractConfig.governance,
        functionName: 'addEligibleVoter',
        args: [parseInt(proposalId), voterAddress],
      })
      
      setSuccess('Voter addition submitted! Waiting for blockchain confirmation...')
      setVoterAddress('')
      setProposalId('')
    } catch (err) {
      console.error('Error adding voter:', err)
      setError('Failed to add voter. Please try again.')
    } finally {
      setIsAddingVoter(false)
    }
  }

  // Update success message when transaction is confirmed
  if (hash && !isConfirming && success) {
    if (success.includes('Proposal submitted')) {
      setSuccess('Proposal created successfully! Check the Proposals page.')
    } else if (success.includes('Reputation grant submitted')) {
      setSuccess('Reputation granted successfully!')
    } else if (success.includes('Voter addition submitted')) {
      setSuccess('Voter added successfully!')
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <a href="/" className="text-orange-500 hover:opacity-80">← Back to Home</a>
          <div className="flex items-center gap-4">
            <a href="/proposals" className="text-stone-600 hover:text-stone-900">Proposals</a>
            <WalletConnect />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Admin Dashboard</h1>
        <p className="text-lg text-stone-600 mb-8">Create and manage governance proposals</p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}
        
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Create New Proposal</h2>
          <form onSubmit={handleCreateProposal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Proposal title"
                disabled={!isConnected}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={4}
                placeholder="Proposal description"
                disabled={!isConnected}
              />
            </div>
            <button 
              type="submit"
              disabled={!isConnected || isCreating || isConfirming}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating || isConfirming ? 'Processing...' : 'Create Proposal'}
            </button>
          </form>
          {!isConnected && (
            <p className="text-sm text-stone-500 mt-2">Connect your wallet to create proposals</p>
          )}
        </div>
        
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Grant Reputation</h2>
          <form onSubmit={handleGrantReputation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">User Address</label>
              <input 
                type="text" 
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0x..."
                disabled={!isConnected}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Reputation Score</label>
              <input 
                type="number" 
                value={reputationScore}
                onChange={(e) => setReputationScore(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="100"
                disabled={!isConnected}
              />
            </div>
            <button 
              type="submit"
              disabled={!isConnected || isGranting}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGranting ? 'Granting...' : 'Grant Reputation'}
            </button>
          </form>
        </div>
        
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Add Eligible Voter</h2>
          <form onSubmit={handleAddVoter} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Proposal ID</label>
              <input 
                type="number" 
                value={proposalId}
                onChange={(e) => setProposalId(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="1"
                disabled={!isConnected}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Voter Address</label>
              <input 
                type="text" 
                value={voterAddress}
                onChange={(e) => setVoterAddress(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0x..."
                disabled={!isConnected}
              />
            </div>
            <button 
              type="submit"
              disabled={!isConnected || isAddingVoter}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingVoter ? 'Adding...' : 'Add Voter'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
