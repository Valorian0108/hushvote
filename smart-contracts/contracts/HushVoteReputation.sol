// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HushVoteReputation {
    mapping(address => uint256) public reputationScores;
    mapping(address => bool) public hasReputation;
    
    uint256 public totalReputation;
    
    event ReputationUpdated(address indexed user, uint256 newScore);
    event ReputationGranted(address indexed user, uint256 score);
    
    function grantReputation(address _user, uint256 _score) external {
        require(!hasReputation[_user], "User already has reputation");
        require(_score > 0, "Score must be positive");
        
        reputationScores[_user] = _score;
        hasReputation[_user] = true;
        totalReputation += _score;
        
        emit ReputationGranted(_user, _score);
    }
    
    function updateReputation(address _user, uint256 _newScore) external {
        require(hasReputation[_user], "User has no reputation");
        require(_newScore > 0, "Score must be positive");
        
        uint256 oldScore = reputationScores[_user];
        reputationScores[_user] = _newScore;
        totalReputation = totalReputation - oldScore + _newScore;
        
        emit ReputationUpdated(_user, _newScore);
    }
    
    function getReputation(address _user) external view returns (uint256) {
        return reputationScores[_user];
    }
    
    function hasUserReputation(address _user) external view returns (bool) {
        return hasReputation[_user];
    }
    
    function getTotalReputation() external view returns (uint256) {
        return totalReputation;
    }
}
