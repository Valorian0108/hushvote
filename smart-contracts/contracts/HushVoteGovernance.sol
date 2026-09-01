// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HushVoteGovernance {
    uint256 public proposalCount;
    uint256 public votingPeriod = 7 days;
    
    struct Proposal {
        uint256 id;
        string title;
        string description;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 abstainVotes;
        bool executed;
        bool passed;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => mapping(address => bool)) public eligibleVoters;
    
    address public reputationContract;
    address public roleManager;
    
    event ProposalCreated(uint256 indexed proposalId, string title, address proposer);
    event VoteCast(uint256 indexed proposalId, address voter, bool vote);
    event ProposalExecuted(uint256 indexed proposalId, bool passed);
    
    modifier onlyRoleManager() {
        require(msg.sender == roleManager, "Only role manager can call this");
        _;
    }
    
    constructor(address _reputationContract, address _roleManager) {
        reputationContract = _reputationContract;
        roleManager = _roleManager;
    }
    
    function createProposal(string memory _title, string memory _description) external {
        proposalCount++;
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + votingPeriod;
        
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            title: _title,
            description: _description,
            proposer: msg.sender,
            startTime: startTime,
            endTime: endTime,
            yesVotes: 0,
            noVotes: 0,
            abstainVotes: 0,
            executed: false,
            passed: false
        });
        
        emit ProposalCreated(proposalCount, _title, msg.sender);
    }
    
    function vote(uint256 _proposalId, bool _vote) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        require(eligibleVoters[_proposalId][msg.sender], "Not eligible to vote");
        
        hasVoted[_proposalId][msg.sender] = true;
        
        if (_vote) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }
        
        emit VoteCast(_proposalId, msg.sender, _vote);
    }
    
    function executeProposal(uint256 _proposalId) external onlyRoleManager {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Already executed");
        
        proposal.executed = true;
        proposal.passed = proposal.yesVotes > proposal.noVotes;
        
        if (proposal.passed) {
            // Trigger role assignment logic here
            // This would interact with the RoleManager contract
        }
        
        emit ProposalExecuted(_proposalId, proposal.passed);
    }
    
    function addEligibleVoter(uint256 _proposalId, address _voter) external onlyRoleManager {
        eligibleVoters[_proposalId][_voter] = true;
    }
    
    function getProposal(uint256 _proposalId) external view returns (
        uint256 id,
        string memory title,
        string memory description,
        address proposer,
        uint256 startTime,
        uint256 endTime,
        uint256 yesVotes,
        uint256 noVotes,
        uint256 abstainVotes,
        bool executed,
        bool passed
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.title,
            proposal.description,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime,
            proposal.yesVotes,
            proposal.noVotes,
            proposal.abstainVotes,
            proposal.executed,
            proposal.passed
        );
    }
    
    function hasUserVoted(uint256 _proposalId, address _voter) external view returns (bool) {
        return hasVoted[_proposalId][_voter];
    }
    
    function isVoterEligible(uint256 _proposalId, address _voter) external view returns (bool) {
        return eligibleVoters[_proposalId][_voter];
    }
}
