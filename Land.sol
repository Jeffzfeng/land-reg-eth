// naming conventions 
// lower camelCase for struct
// plural lower camelCase for object
// snake_case for attributes 

pragma solidity ^0.4.18;

contract Land {
    struct DateTime {
        uint year;
        uint month;
        uint day;
    }
    
    struct GeographicBoundaries{
        //solidity doesnt support floats?
        uint lattidue;
        uint longitude;
    }
        
    struct landStruct{
        uint PIN;
        DateTime activationDate;
        DateTime inactivationDate;
        GeographicBoundaries point1;
        string owner;
    }   
    mapping(uint => landStruct) land;
    uint[] public landList;
  
    DateTime public datetime;
    GeographicBoundaries public geographicboundary;
    //landStruct public land;
    
    function createDateTime(uint _year, uint _month, uint day) returns(DateTime dateObj){
        //var dateTimeObj = DateTimeStruct;
        datetime.year = _year;
        datetime.month = _month;
        return datetime;
        
    }
    
    function createGeographicPoint(uint _lat, uint _long) returns(GeographicBoundaries Apoint){
        //var point = GeographicBoundaries;
        geographicboundary.lattidue = _lat;
        geographicboundary.longitude = _long;
        return geographicboundary;
        
    }
    /*
    function createLand(uint _pin, _activationDate, DateTime _inactivationDate, GeographicBoundaries _point1, string _owner) {
        land[_pin].PIN = _pin;
        land[_pin].owner = _owner;
        land[_pin].activationDate = _activationDate;
        land[_pin].inactivationDate = _inactivationDate;
        land[_pin].point1 = _point1;
        landList.push(_pin);
    }
    
    function updateLandOwner(uint _pin, string newOwner) returns(bool success){
        land[_pin].owner = newOwner;
        return true;
    }
    
    function getLandInfo(uint _pin) returns (uint, string, DateTime, DateTime){
        var landRecord = land[_pin];
        return (landRecord.PIN, landRecord.owner, landRecord.activationDate, landRecord.inactivationDate);
    }
    */
}
