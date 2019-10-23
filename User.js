// User klasse
class User {
    constructor(firstName, lastName, username, password, sportTeams){
         this.firstName = firstName;
         this.lastName = lastName;
         this.username = username;
         this.password = password;
         this.sportTeams = sportTeams;
     }
}
//Coach klasse, som er nedarvet fra User
class Coach extends User{
    constructor(firstName, lastName, username, password, coachID, sportTeams){
        super(firstName, lastName, username, password, sportTeams);
        this.coachID = coachID;
    }
}
//Student klasse, som er nedarvet fra User
class Student extends User{
    constructor(firstName, lastName, username, password, studentID, sportTeams){
      super(firstName, lastName, username, password, sportTeams);
      this.studentID = studentID;
    }
}

//Facility klasse
class Facility {
    constructor(facilityId, capacity, suitableSports){
        this.facilityId = facilityId;
        this.capacity = capacity;
        this.suitableSports = suitableSports;
    }
}

//Tomt array til facilities
var facilities = []

//Facility dummy data, som bliver pushet til facilities
facilities.push(new Facility ("hal1", "10", ["fodbold1", "fodbold2", "fodbold3", "tennis1", "tennis2", "tennis3"]));
facilities.push(new Facility ("hal2", "8", ["springgymnastik1", "springgymnastik2", "springgymnastik3"]));
facilities.push(new Facility ("hal2", "12", ["tennis1", "tennis2", "tennis3","springgymnastik1", "springgymnastik2", "springgymnastik3"]));

//Tjekker om LocalStorage er tom. Hvis localStorage er tom, bliver dummy dataene gemt i localStorage.
if (localStorage.getItem("User") == null) {
    var userList = [];
    //Dummy user data, som objekter der bliver pushet til et empty array
    userList.push(new Coach("Hussain", "Rafi", "hussain", "rafi123", 1, ["fodbold1", "springgymnastik3"]));
    userList.push(new Student("Philip", "Burleigh", "philip", "burleigh123", 1, ["tennis2", "springgymnastik3"]));
    userList.push(new Student("Andreas", "Krogh", "andreas", "krogh123", 2, ["fodbold3", "tennis3"]));
    userList.push(new Student("Caroline", "Lindegren", "caroline", "lindegren123", 3, ["springgymnastik3"]));

    var userListString = JSON.stringify(userList);
    localStorage.setItem("User", userListString);
//Hvis LocalStorage ikke er tom, hentes LocalStorage og gemmes i userList
} else {
    var userList = JSON.parse(localStorage.getItem("User"))
}

//Funktion til login
function login(){
    //Starter med at hente input fra HTML form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var storedUsersList = JSON.parse(localStorage.getItem("User"));

    //for loop som kører alle user objekter igennem og ser om username og password findes og matcher
    for(i=0; i<storedUsersList.length; i++){
        if(username.toLowerCase().trim() == storedUsersList[i].username && password == storedUsersList[i].password){
            console.log(username.trim() + " er logget ind" )
            if (storedUsersList[i].coachID > 0){
                window.location.replace("AdminIndex.html");
                var logOn = JSON.stringify(storedUsersList[i]);
                localStorage.setItem("loggedIn", logOn);

            } else {
                    window.location.replace("StudentIndex.html");
                    var logOn = JSON.stringify(storedUsersList[i]);
                    localStorage.setItem("loggedIn", logOn);
                 }
        return
        }
    };
    //Fejlbesked hvis username og password ikke matcher
    alert("Brugernavn eller adgangskode findes ikke");
}

//Opret ny bruger
function newUser(){
        //Brugertype importeres (Coach eller Student)
        var userTypes = document.getElementsByClassName("userType");
        var userType = "";

        for (i=0; i<userTypes.length; i++) {
            if (userTypes[i].checked) {
                userType = "Coach"
            } else {
                userType = "Student"
            }
        }

        //Fornavn, efternavn, brugernavn og password importeres fra tekstfelterne
        var firstName = document.getElementById("newFirstName").value;
        var lastName = document.getElementById("newLastName").value;
        var username = document.getElementById("newUserName").value.toLowerCase();
        var password = document.getElementById("newPassword").value;

        //Tomt array til sportsgrene
        var sportLevels = [];

        //Tjekker hvilke sportsgrene der er checket af, og pusher dem til sportLevels
        var sportLevel = document.getElementsByClassName("sportLevel");
        for (i=0; i<sportLevel.length; i++) {
            if (sportLevel[i].checked) {
                sportLevels.push(sportLevel[i].value)
            }
        }

        //Brugerne i local storage importeres
        var storedUsersList = JSON.parse(localStorage.getItem("User"));

        //Genererer nyt unikt coachID
        if(userType == "Coach"){
            var idNumber = 1;
            for(i=0; i<storedUsersList.length; i++) {
                if (storedUsersList[i].coachID >= 0) {
                    idNumber += 1
                }
            }
            //Opretter ny coach og gemmer brugeren i local storage
            userList.push(new Coach(firstName, lastName, username, password, idNumber, sportLevels));
            var newLocalUserListString = JSON.stringify(userList);
            localStorage.setItem("User", newLocalUserListString)
        } else {
            //Genererer nyt unikt studentID
            var idNumber = 1;
            for(i=0; i<storedUsersList.length; i++) {
                if (storedUsersList[i].studentID >= 0) {
                    idNumber += 1
                }
            }
            //Opretter ny student og gemmer brugeren i userList
            userList.push(new Student(firstName, lastName, username, password, idNumber, sportLevels));

            //Stringify'er userList og gemmer listen i localStorage
            var newLocalUserListString = JSON.stringify(userList);
            localStorage.setItem("User", newLocalUserListString)
        }
}

//newSession funktion
function newSession(userList, facilities) {
    //Henter den træner der er logget ind
    var coach = JSON.parse(localStorage.getItem("loggedIn"));

    var coachSports = [];

    for (i=0; i < coach.sportTeams.length; i++) {
        coachSports.push(coach.sportTeams[i])
    }

    //Henter alle brugere
    var storedUsersList = JSON.parse(localStorage.getItem("User"));

    //Tomt array til de brugere som er students
     var users = [];

    //Looper igennem alle brugerne og pusher alle student til "users"
    for (i=0; i<storedUsersList.length; i++) {
        if (storedUsersList[i].studentID >= 0) {
            users.push(storedUsersList[i])
        }
    }

    var currentSport = "";

    //Tjekker hvilke sportsgrene der er checket af, og pusher dem til sportLevels
    var sportLevel = document.getElementsByClassName("sportLevel");
    for (i=0; i<sportLevel.length; i++) {
        if (sportLevel[i].checked) {
            currentSport = sportLevel[i].value
        }
    }

    var currentUsers = [];

    for (i=0; i<coachSports.length; i++) {
        if (coachSports[i]==currentSport) {
            console.log("test")
        }
    }
}

