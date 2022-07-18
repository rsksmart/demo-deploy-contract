import chai from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised";
import { deployContract } from "../scripts/utils";
import { ClientContract } from "../typechain";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("ClientContract", function () {
  let owner: Signer;

  let contractAsOwner: ClientContract;
  this.beforeEach(async () => {
    [owner] = await ethers.getSigners();

    contractAsOwner = await deployContract(owner);
  });

  it("Should deploy a new contract", async function () {
    const createMappingTx = await contractAsOwner.createMapping(5);
    await createMappingTx.wait();

    const mapping1count = await contractAsOwner.getNumbers(1);

    expect(mapping1count).equal(5);
  });

  it("Should deploy two new contract", async function () {
    const createMappingTx = await contractAsOwner.createMapping(5);
    const receipt1 = await createMappingTx.wait();
    const firstContract = receipt1.events![0].args!.newContract;

    const createMapping2Tx = await contractAsOwner.createMapping(10);
    const receipt2 = await createMapping2Tx.wait();
    const secondContract = receipt2.events![0].args!.newContract;

    const mapping1count = await contractAsOwner.getNumbers(1);
    const mapping2count = await contractAsOwner.getNumbers(2);

    console.log({ firstContract, secondContract });

    expect(mapping1count).equal(5);
    expect(mapping2count).equal(10);
    expect(firstContract).not.equal(secondContract);
  });
});
