import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";


const SepoliaRouterAddress = process.env.SEPOLIA_ROUTER_ADDRESS;
const SepoliaLinkAddress = process.env.SEPOLIA_LINK_ADDRESS;
const PolygonMinterAddress = process.env.POLYGON_MINTER_ADDRESS;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const eventTicketCollection = await deploy("Collection", {
    from: deployer,
    log: true,
  });

  const minter = await deploy("Minter", {
    from: deployer,
    args: [
      eventTicketCollection.address,
      PolygonMinterAddress,
      SepoliaRouterAddress,
      SepoliaLinkAddress,
    ],
    log: true,
  });

  // Get the deployed Collection contract instance
  const eventTicketCollectionDeployed = await ethers.getContractAt("Collection", eventTicketCollection.address);

  // Call the setMinter method on the Collection contract
  const tx = await eventTicketCollectionDeployed.setMinter(minter.address);
  await tx.wait();
  
  console.log(
    "Contract Collection deployed at: ",
    eventTicketCollection.address
  );
  console.log(
    "Contract Minter deployed at: ",
    minter.address
  );
  console.log(
    "Collection contract name: ",
    await eventTicketCollectionDeployed.name()
  );
  console.log(
    "Collection contract owner: ",
    await eventTicketCollectionDeployed.owner()
  );
};
export default func;
func.tags = ["EventTicketMinter", "EventTicketManager"];