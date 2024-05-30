import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const eventTicketCollection = await deploy("Collection", {
    from: deployer,
    log: true,
  });
  await deploy("Minter", {
    from: deployer,
    args: [eventTicketCollection.address],
    log: true,
  });
  const eventTicketCollectionDeployed = await ethers.getContractAt("Collection", eventTicketCollection.address);
  console.log(
    "Hello, contract name and owner: ",
    await eventTicketCollectionDeployed.name(),
    await eventTicketCollectionDeployed.owner(),
  );
};
export default func;
func.tags = ["EventTicketMinter", "EventTicketManager"];