// naming conventions 
// lower camelCase for struct
// plural lower camelCase for object
// snake_case for attributes 

pragma solidity ^0.4.18;


contract Land {

    struct landStruct{
        uint PIN;
        string activationDate;
        string inactivationDate;
        uint point1;
        string owner;
    }   
    mapping(uint => landStruct) land;
    landStruct[] public landList;
  
    landStruct public landstruct;
    function createLand(uint _pin, string _activationDate, string _inactivationDate, uint _point1, string _owner) {
        land[_pin].PIN = _pin;
        land[_pin].owner = _owner;
        land[_pin].activationDate = _activationDate;
        land[_pin].inactivationDate = _inactivationDate;
        land[_pin].point1 = _point1;
    }
    
    function updateLandOwner(uint _pin, string newOwner) returns(bool success){
        land[_pin].owner = newOwner;
        return true;
    }
    
    function getLandInfo(uint _pin) returns(landStruct){
        landstruct = landList[_pin];
        return (landstruct);
    }
    
}
