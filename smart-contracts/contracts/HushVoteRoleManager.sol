// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HushVoteRoleManager {
    mapping(address => bool) public isAdmin;
    mapping(address => bool) public isModerator;
    mapping(address => mapping(string => bool)) public hasRole;
    
    address public owner;
    
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event RoleAssigned(address indexed user, string role);
    event RoleRevoked(address indexed user, string role);
    
    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can call this function");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        isAdmin[msg.sender] = true;
    }
    
    function addAdmin(address _admin) external onlyOwner {
        require(!isAdmin[_admin], "Already an admin");
        isAdmin[_admin] = true;
        emit AdminAdded(_admin);
    }
    
    function removeAdmin(address _admin) external onlyOwner {
        require(isAdmin[_admin], "Not an admin");
        isAdmin[_admin] = false;
        emit AdminRemoved(_admin);
    }
    
    function assignRole(address _user, string memory _role) external onlyAdmin {
        hasRole[_user][_role] = true;
        emit RoleAssigned(_user, _role);
    }
    
    function revokeRole(address _user, string memory _role) external onlyAdmin {
        hasRole[_user][_role] = false;
        emit RoleRevoked(_user, _role);
    }
    
    function hasUserRole(address _user, string memory _role) external view returns (bool) {
        return hasRole[_user][_role];
    }
    
    function checkRole(address _user, string memory _role) external view returns (bool) {
        return hasRole[_user][_role];
    }
}
