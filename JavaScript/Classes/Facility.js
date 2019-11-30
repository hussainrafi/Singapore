//Facility klasse
class Facility {
    constructor(facilityId, capacity, suitableSports){
        this.facilityId = facilityId;
        this.capacity = capacity;
        this.suitableSports = suitableSports;
    }
}

//Tomt array til facilities
var facilities = [];

//Facility dummy data, som bliver pushet til facilities
facilities.push(new Facility ("Indendørs fodbold- og tennisbane", "10", ["Fodbold 1. hold", "Fodbold 2. hold", "Fodbold 3. hold", "Tennis 1. hold", "Tennis 2. hold", "Tennis 3. hold"]));
facilities.push(new Facility ("Springhal", "8", ["Springgymnastik 1. hold", "Springgymnastik 2. hold", "Springgymnastik 3. hold"]));
facilities.push(new Facility ("Indendørs tennis- og springhal", "12", ["Tennis 1. hold", "Tennis 2. hold", "Tennis 3. hold","Springgymnastik 1. hold", "Springgymnastik 2. hold", "Springgymnastik 3. hold"]));

