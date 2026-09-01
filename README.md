# HushVote

**Confidential Community Governance with Reputation-Based Voting using Zama FHEVM**

A confidential governance application that allows qualified members to vote privately using hidden reputation-based influence. Zama processes the voting rules and tally over encrypted data, revealing only the final outcome and triggering public on-chain actions when a proposal passes.

## 🏆 Hackathon Submission

**Project:** HushVote - Confidential Governance  
**Category:** Privacy-Preserving Governance  
**Network:** Ethereum Sepolia Testnet  
**Technology:** Zama FHEVM, Next.js, Solidity

## 🌟 Key Features

- **Confidential Voting** - Votes remain encrypted throughout the entire process
- **Reputation-Based** - Voting influence based on contribution scores, not token holdings
- **Encrypted Computation** - Zama FHEVM processes rules over encrypted data
- **Public Outcomes** - Only final results are revealed on-chain
- **On-Chain Triggers** - Successful proposals trigger role assignments
- **Real Deployment** - Live contracts on Sepolia testnet

## 📋 Live Demo

- **Frontend:** http://localhost:3000 (development)
- **Network:** Ethereum Sepolia Testnet
- **Smart Contracts:** Verified on Etherscan

## 🔗 Deployed Contracts (Sepolia)

- **HushVoteReputation:** [0x24F7E61A1d59Bf7f18CC865E6156439212c3cB09](https://sepolia.etherscan.io/address/0x24F7E61A1d59Bf7f18CC865E6156439212c3cB09#code)
- **HushVoteRoleManager:** [0xf49b6F52DFE1fa80E4502Afcdca3D093EF4a0b05](https://sepolia.etherscan.io/address/0xf49b6F52DFE1fa80E4502Afcdca3D093EF4a0b05#code)
- **HushVoteGovernance:** [0x218839Fec7239f1881c54174E84ACb8D966a9b0D](https://sepolia.etherscan.io/address/0x218839Fec7239f1881c54174E84ACb8D966a9b0D#code)

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Wallet:** Wagmi + Viem
- **FHE SDK:** @zama-fhe/react-sdk

### Smart Contracts
- **Language:** Solidity 0.8.28
- **Framework:** Hardhat
- **FHE Integration:** @fhevm/solidity, @fhevm/hardhat-plugin
- **Network:** Ethereum Sepolia

### Architecture
- **Confidential Computation:** Zama Fully Homomorphic Encryption
- **Wallet Connection:** MetaMask, WalletConnect
- **Contract Interaction:** Wagmi hooks (useReadContract, useWriteContract)

## 📁 Project Structure

```
hushvote/
├── src/                      # Next.js web application
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   └── lib/                  # Utilities and configurations
├── smart-contracts/          # Solidity smart contracts
│   ├── contracts/           # Smart contract source files
│   ├── scripts/              # Deployment scripts
│   └── hardhat.config.ts    # Hardhat configuration
├── public/                   # Public assets
├── package.json              # Next.js dependencies
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- MetaMask or compatible wallet
- Sepolia testnet ETH for gas

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hushvote.git
cd hushvote

# Install dependencies
npm install

# Install smart contract dependencies
cd smart-contracts
npm install
cd ..
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Add your environment variables
NEXT_PUBLIC_NETWORK_ID=11155111
NEXT_PUBLIC_CHAIN_NAME=sepolia
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_REPUTATION_CONTRACT=0x24F7E61A1d59Bf7f18CC865E6156439212c3cB09
NEXT_PUBLIC_ROLE_MANAGER_CONTRACT=0xf49b6F52DFE1fa80E4502Afcdca3D093EF4a0b05
NEXT_PUBLIC_GOVERNANCE_CONTRACT=0x218839Fec7239f1881c54174E84ACb8D966a9b0D
```

### Run Development Server

```bash
# Start the frontend
npm run dev

# Visit http://localhost:3000
```

### Smart Contract Development

```bash
# Compile contracts
cd smart-contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia

# Verify contracts on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## 📝 Smart Contract Architecture

### HushVoteReputation
Manages reputation scores and eligibility for voting
- `grantReputation(address, uint256)` - Assign reputation to users
- `updateReputation(address, uint256)` - Update existing reputation
- `getReputation(address)` - Query user reputation

### HushVoteRoleManager
Handles role assignments and admin functions
- `addAdmin(address)` - Grant admin privileges
- `assignRole(address, string)` - Assign custom roles
- `hasUserRole(address, string)` - Check user roles

### HushVoteGovernance
Main governance contract for proposals and voting
- `createProposal(string, string)` - Create new proposals
- `vote(uint256, bool)` - Cast encrypted votes
- `executeProposal(uint256)` - Execute successful proposals
- `addEligibleVoter(uint256, address)` - Grant voting eligibility

## 🔐 Security & Privacy

- **Confidential Votes** - Individual votes encrypted using FHE
- **Reputation Privacy** - Reputation scores remain private
- **Public Verifiability** - Final outcomes verifiable on-chain
- **No Token Dependency** - Voting power based on contribution, not wealth

## 🧪 Testing

```bash
# Run smart contract tests
cd smart-contracts
npx hardhat test

# Run frontend tests
npm test
```

## 📦 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Smart Contracts
```bash
# Configure deployment keys in smart-contracts/.env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_rpc_url
ETHERSCAN_API_KEY=your_etherscan_key

# Deploy
cd smart-contracts
npx hardhat run scripts/deploy.ts --network sepolia
```

## 🎯 Hackathon Demo Flow

1. **Connect Wallet** - Connect MetaMask to Sepolia testnet
2. **View Proposals** - Browse active governance proposals
3. **Cast Vote** - Vote on proposals with encrypted ballot
4. **View Results** - See final outcomes (without individual votes)
5. **Admin Panel** - Create proposals and manage roles

## 🤝 Contributing

This project was built for the Zama Developer Program hackathon. Feel free to explore the code and suggest improvements!

## 📄 License

MIT License - feel free to use this code for your own confidential governance projects.

## 🙏 Acknowledgments

- **Zama** - For the FHEVM technology and developer support
- **Ethereum Foundation** - For the Sepolia testnet
- **Hardhat Team** - For the excellent development framework

---

**Built with ❤️ for the Zama Developer Program Hackathon**
