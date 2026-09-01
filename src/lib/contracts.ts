import { contractAddresses } from './wallet'

// Contract ABIs (simplified for basic interaction)
const reputationABI = [
  'function grantReputation(address _user, uint256 _score) external',
  'function updateReputation(address _user, uint256 _newScore) external',
  'function getReputation(address _user) external view returns (uint256)',
  'function hasUserReputation(address _user) external view returns (bool)',
  'function getTotalReputation() external view returns (uint256)',
  'event ReputationGranted(address indexed user, uint256 score)',
  'event ReputationUpdated(address indexed user, uint256 newScore)',
]

const roleManagerABI = [
  'function addAdmin(address _admin) external',
  'function removeAdmin(address _admin) external',
  'function assignRole(address _user, string _role) external',
  'function revokeRole(address _user, string _role) external',
  'function hasUserRole(address _user, string _role) external view returns (bool)',
  'function isAdmin(address _user) external view returns (bool)',
  'event AdminAdded(address indexed admin)',
  'event RoleAssigned(address indexed user, string role)',
]

const governanceABI = [
  'function createProposal(string _title, string _description) external',
  'function vote(uint256 _proposalId, bool _vote) external',
  'function executeProposal(uint256 _proposalId) external',
  'function addEligibleVoter(uint256 _proposalId, address _voter) external',
  'function getProposal(uint256 _proposalId) external view returns (uint256, string, string, address, uint256, uint256, uint256, uint256, uint256, bool, bool)',
  'function hasUserVoted(uint256 _proposalId, address _voter) external view returns (bool)',
  'function isVoterEligible(uint256 _proposalId, address _voter) external view returns (bool)',
  'event ProposalCreated(uint256 indexed proposalId, string title, address proposer)',
  'event VoteCast(uint256 indexed proposalId, address voter, bool vote)',
  'event ProposalExecuted(uint256 indexed proposalId, bool passed)',
]

export const contracts = {
  reputation: {
    address: contractAddresses.reputation,
    abi: reputationABI,
  },
  roleManager: {
    address: contractAddresses.roleManager,
    abi: roleManagerABI,
  },
  governance: {
    address: contractAddresses.governance,
    abi: governanceABI,
  },
}

export const contractConfig = {
  reputation: {
    address: contractAddresses.reputation as `0x${string}`,
    abi: reputationABI,
  },
  roleManager: {
    address: contractAddresses.roleManager as `0x${string}`,
    abi: roleManagerABI,
  },
  governance: {
    address: contractAddresses.governance as `0x${string}`,
    abi: governanceABI,
  },
}