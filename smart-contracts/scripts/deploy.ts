import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Deploying HushVote contracts to Sepolia...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy Reputation Contract
  console.log("\n1. Deploying HushVoteReputation...");
  const Reputation = await ethers.getContractFactory("HushVoteReputation");
  const reputation = await Reputation.deploy();
  await reputation.waitForDeployment();
  console.log("HushVoteReputation deployed to:", await reputation.getAddress());

  // Deploy Role Manager Contract
  console.log("\n2. Deploying HushVoteRoleManager...");
  const RoleManager = await ethers.getContractFactory("HushVoteRoleManager");
  const roleManager = await RoleManager.deploy();
  await roleManager.waitForDeployment();
  console.log("HushVoteRoleManager deployed to:", await roleManager.getAddress());

  // Deploy Governance Contract with addresses
  console.log("\n3. Deploying HushVoteGovernance...");
  const reputationAddress = await reputation.getAddress();
  const roleManagerAddress = await roleManager.getAddress();
  
  const Governance = await ethers.getContractFactory("HushVoteGovernance");
  const governance = await Governance.deploy(reputationAddress, roleManagerAddress);
  await governance.waitForDeployment();
  console.log("HushVoteGovernance deployed to:", await governance.getAddress());

  console.log("\n=== Deployment Complete ===");
  console.log("HushVoteReputation:", reputationAddress);
  console.log("HushVoteRoleManager:", roleManagerAddress);
  console.log("HushVoteGovernance:", await governance.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
