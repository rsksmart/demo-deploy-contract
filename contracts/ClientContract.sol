//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MappingContract.sol";

contract ClientContract {
    using Counters for Counters.Counter;
    Counters.Counter private _counter;

    event MappingCreated(address indexed newContract);

    mapping(uint256 => MappingContract) private _mappingContracts;

    constructor() {}

    function createMapping(uint256 numbersQuantity) external {
        _counter.increment();
        uint256 newNumber = _counter.current();

        MappingContract newMappingContract = new MappingContract();

        _mappingContracts[newNumber] = newMappingContract;

        for (uint256 n = 0; n < numbersQuantity; n++) {
            newMappingContract.addNumber();
        }

        emit MappingCreated(address(newMappingContract));
    }

    function getNumbers(uint256 index) external view returns (uint256) {
        MappingContract mappingContract = _mappingContracts[index];

        return mappingContract.getCount();
    }
}
