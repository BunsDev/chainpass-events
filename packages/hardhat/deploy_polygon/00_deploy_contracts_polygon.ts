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
  console.log(">>>>>>>>>>eventTicketCollection:" + eventTicketCollection.address);
  const router = "0x9f656e0361Fb5Df2ac446102c8aB31855B591692";//Amoy router
  const destinationMinterContract = await deploy("DestinationMinter", {
    from: deployer,
    args: [router, eventTicketCollection.address],
    log: true,
  });
  console.log(">>>>>>>>>>destinationMinterContract:" + destinationMinterContract.address);
  const eventTicketCollectionDeployed = await ethers.getContractAt("Collection", eventTicketCollection.address);
  await eventTicketCollectionDeployed.setMinter(destinationMinterContract.address);
};
export default func;
func.tags = ["EventTicketCollection", "DestinationMinterContract"];