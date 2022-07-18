//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MappingContract {
    using Counters for Counters.Counter;
    Counters.Counter private _counter;

    mapping(uint256 => uint256) private _numbers;

    constructor() {}

    function addNumber() external {
        _counter.increment();
        uint256 newNumber = _counter.current();

        _numbers[newNumber] = newNumber;
    }

    function getCount() external view returns (uint256) {
        return _counter.current();
    }
}
