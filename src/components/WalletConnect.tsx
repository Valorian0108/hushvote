'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState } from 'react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    try {
      setError(null)
      // Connect to the first available connector (usually injected/MetaMask)
      const connector = connectors[0]
      if (connector) {
        console.log('Connecting to wallet:', connector.name)
        await connect({ connector })
      }
    } catch (err) {
      console.error('Connection error:', err)
      setError('Failed to connect wallet. Please try again.')
    }
  }

  // Show connection errors from wagmi
  if (connectError) {
    console.error('Wagmi connection error:', connectError)
    setError(connectError.message)
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-stone-600">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <div className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded">
          {error}
        </div>
      )}
      <button
        onClick={handleConnect}
        disabled={isPending}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  )
}