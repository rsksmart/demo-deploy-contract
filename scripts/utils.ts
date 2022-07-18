/* eslint-disable camelcase */
import { Signer } from "ethers";
import { ClientContract__factory } from "../typechain";

export const deployContract = async (
  owner: Signer,
  showLog: boolean = false
) => {
  const contractFactory = new ClientContract__factory(owner);
  const contract = await contractFactory.deploy();
  await contract.deployed();

  if (showLog) console.log("Contract deployed to:", contract.address);

  return contract;
};
