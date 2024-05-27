import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const eventTicket = await deploy("EventTicket", {
    from: deployer,
    log: true,
  });

  const eventTicketMinter = await deploy("EventTicketManager", {
    from: deployer,
    args: [eventTicket.address],
    log: true,
  });

  // Verify ownership of EventTicket
  const eventTicketContract = await ethers.getContractAt("EventTicket", eventTicket.address);
  const eventTicketOwner = await eventTicketContract.owner();
  console.log(`EventTicket Owner: ${eventTicketOwner}`);

  // Verify ownership of EventTicketMinter
  const eventTicketMinterContract = await ethers.getContractAt("EventTicketManager", eventTicketMinter.address);
  const eventTicketMinterOwner = await eventTicketMinterContract.owner();
  console.log(`EventTicketMinter Owner: ${eventTicketMinterOwner}`);
};

export default func;
func.tags = ["EventTicket", "EventTicketManager"];
