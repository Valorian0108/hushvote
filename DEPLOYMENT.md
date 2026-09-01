# HushVote Deployment Guide

## 🚀 Quick Start for Hackathon Judges

### 1. Prerequisites
- Node.js 20+ installed
- MetaMask browser extension
- Sepolia testnet ETH (get from faucet)

### 2. Setup Instructions

```bash
# Clone repository
git clone https://github.com/your-username/hushvote.git
cd hushvote

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Add your RPC URL and contract addresses
```

### 3. Run Application

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
```

### 4. Connect Wallet

1. Install MetaMask
2. Add Sepolia testnet to MetaMask
3. Click "Connect Wallet" in the app
4. Approve connection request

### 5. Test Features

**Create Proposal:**
- Navigate to `/admin`
- Enter proposal title and description
- Click "Create Proposal"

**Cast Vote:**
- Navigate to `/proposal/1/vote`
- Click "Yes" or "No"
- Confirm transaction in MetaMask

**View Results:**
- Navigate to `/results/1`
- See voting outcomes (individual votes hidden)

## 🔧 Configuration

### Environment Variables (.env.local)

```bash
# Network Configuration
NEXT_PUBLIC_NETWORK_ID=11155111
NEXT_PUBLIC_CHAIN_NAME=sepolia

# RPC Configuration
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Deployed Contract Addresses (Sepolia)
NEXT_PUBLIC_REPUTATION_CONTRACT=0x24F7E61A1d59Bf7f18CC865E6156439212c3cB09
NEXT_PUBLIC_ROLE_MANAGER_CONTRACT=0xf49b6F52DFE1fa80E4502Afcdca3D093EF4a0b05
NEXT_PUBLIC_GOVERNANCE_CONTRACT=0x218839Fec7239f1881c54174E84ACb8D966a9b0D
```

### Smart Contract Configuration (smart-contracts/.env)

```bash
# RPC Configuration
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Deployer Credentials
PRIVATE_KEY=your_private_key_here

# Etherscan API Key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## 🌐 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Vercel will automatically detect Next.js and deploy with default settings.

### Smart Contracts

```bash
cd smart-contracts

# Compile contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## 🧪 Testing

### Local Testing

```bash
# Test smart contracts
cd smart-contracts
npx hardhat test

# Test frontend
npm test
```

### Manual Testing Checklist

- [ ] Wallet connects successfully
- [ ] Can create proposals
- [ ] Can cast votes
- [ ] Can view results
- [ ] Transactions complete on Sepolia
- [ ] Contracts verified on Etherscan

## 📊 Live Contract Addresses

**Sepolia Testnet:**
- Reputation: `0x24F7E61A1d59Bf7f18CC865E6156439212c3cB09`
- Role Manager: `0xf49b6F52DFE1fa80E4502Afcdca3D093EF4a0b05`
- Governance: `0x218839Fec7239f1881c54174E84ACb8D966a9b0D`

## 🔍 Troubleshooting

### Common Issues

**Wallet not connecting:**
- Ensure MetaMask is installed
- Check you're on Sepolia testnet
- Make sure you have Sepolia ETH

**Transaction failing:**
- Check gas fees
- Ensure you have enough Sepolia ETH
- Verify network connection

**Contract interaction failing:**
- Check contract addresses in .env.local
- Ensure RPC URL is working
- Verify contracts are deployed

## 📞 Support

For issues or questions:
- Check the main README.md
- Review smart contract documentation
- Check Etherscan for contract status

---

**Ready for hackathon demonstration!**