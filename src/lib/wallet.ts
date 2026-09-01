import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
      showQrModal: true 
    }),
  ],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/I_XOTRaMcXsM2FEjAxEBd'),
  },
})

export const contractAddresses = {
  reputation: process.env.NEXT_PUBLIC_REPUTATION_CONTRACT as string,
  roleManager: process.env.NEXT_PUBLIC_ROLE_MANAGER_CONTRACT as string,
  governance: process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT as string,
}