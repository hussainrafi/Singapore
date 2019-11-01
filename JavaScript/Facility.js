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
facilities.push(new Facility ("hal1", "10", ["fodbold1", "fodbold2", "fodbold3", "tennis1", "tennis2", "tennis3"]));
facilities.push(new Facility ("hal2", "8", ["springgymnastik1", "springgymnastik2", "springgymnastik3"]));
facilities.push(new Facility ("hal3", "12", ["tennis1", "tennis2", "tennis3","springgymnastik1", "springgymnastik2", "springgymnastik3"]));
