import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const AmoyRouterAddress = process.env.AMOY_ROUTER_ADDRESS;
const TestUserAddress = process.env.TEST_USER_ADDRESS;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const eventTicketCollection = await deploy("Collection", {
    from: deployer,
    log: true,
  });
  console.log(">>>>>>>>>> eventTicketCollection: " + eventTicketCollection.address);

  const destinationMinterContract = await deploy("DestinationMinter", {
    from: deployer,
    args: [
      AmoyRouterAddress, 
      eventTicketCollection.address
    ],
    log: true,
  });
  console.log(">>>>>>>>>> destinationMinterContract: " + destinationMinterContract.address);

  const eventTicketCollectionDeployed = await ethers.getContractAt("Collection", eventTicketCollection.address);
  await eventTicketCollectionDeployed.setMinter(destinationMinterContract.address);
  const balance = await eventTicketCollectionDeployed.balanceOf(TestUserAddress);
  console.log(`Balance of ${TestUserAddress}: ${balance.toString()}`);

};
export default func;
func.tags = ["EventTicketCollection", "DestinationMinterContract"];