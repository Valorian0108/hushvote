# hushvote

**confidential community governance with reputation-based voting using zama fhevm**

a confidential governance application that allows qualified members to vote privately using hidden reputation-based influence. zama processes the voting rules and tally over encrypted data, revealing only the final outcome and triggering public on-chain actions when a proposal passes.

## project structure

```
hushvote/
├── src/                  # next.js web application
├── public/               # public assets
├── smart-contracts/      # solidity smart contracts
├── package.json          # next.js dependencies
└── README.md
```

## getting started

### install dependencies
```bash
npm install
```

### run development server
```bash
npm run dev
```

### build for production
```bash
npm run build
```

## features

- **confidential voting** - votes remain encrypted
- **reputation-based** - voting influence based on contribution scores
- **encrypted computation** - zama fhevm processes rules over encrypted data
- **public outcomes** - only final results are revealed
- **on-chain triggers** - successful proposals trigger role assignments

## technology

- **frontend**: next.js 16, typescript, tailwind css
- **contracts**: solidity 0.8.27, hardhat, zama fhevm
- **blockchain**: ethereum sepolia testnet
- **encryption**: zama fully homomorphic encryption

## deployment

the web application is designed for vercel deployment with automatic next.js detection.
