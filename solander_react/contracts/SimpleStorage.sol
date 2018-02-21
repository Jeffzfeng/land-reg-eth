pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;
  bytes32 storedString;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function setString(bytes32 y) public {
  	storedString = y;
  }

  function getString() public view returns (bytes32) {
    return storedString;
  }
}
