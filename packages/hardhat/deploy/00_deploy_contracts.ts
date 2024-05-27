import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const eventTicketMinter = await deploy("EventTicketMinter", {
    from: deployer,
    log: true,
  });

  await deploy("EventTicketManager", {
    from: deployer,
    args: [eventTicketMinter.address],
    log: true,
  });

  const eventTicketMinterDeployed = await ethers.getContractAt("EventTicketMinter", eventTicketMinter.address);

  console.log(
    "Hello, contract name and owner: ",
    await eventTicketMinterDeployed.name(),
    await eventTicketMinterDeployed.owner(),
  );
};

export default func;
func.tags = ["EventTicketMinter", "EventTicketManager"];
