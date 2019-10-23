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
    constructor(firstName, lastName, username, password, coachID, sportTeams, ){
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

//Session
class Session {
    constructor(coach, students, facility){
        this.coach = coach;
        this.students = students;
        this.facility = facility;
    }
}

//Tomt array til facilities
var facilities = [];

//Facility dummy data, som bliver pushet til facilities
facilities.push(new Facility ("hal1", "10", ["fodbold1", "fodbold2", "fodbold3", "tennis1", "tennis2", "tennis3"]));
facilities.push(new Facility ("hal2", "8", ["springgymnastik1", "springgymnastik2", "springgymnastik3"]));
facilities.push(new Facility ("hal3", "12", ["tennis1", "tennis2", "tennis3","springgymnastik1", "springgymnastik2", "springgymnastik3"]));

//Tomt array, som alle brugere bliver pushet til
var userList = [];

//Tjekker om mappen "User", i LocalStorage, er tom. Hvis "User" er tom, bliver dummy dataene gemt i mappen.
if (localStorage.getItem("User") == null) {
    //Dummy user data, som bliver pushet til "userList"
    userList.push(new Coach("Hussain", "Rafi", "hussain", "rafi123", 1, ["fodbold1", "springgymnastik3"]));
    userList.push(new Student("Philip", "Burleigh", "philip", "burleigh123", 1, ["tennis2", "springgymnastik3"]));
    userList.push(new Student("Andreas", "Krogh", "andreas", "krogh123", 2, ["fodbold3", "tennis3"]));
    userList.push(new Student("Caroline", "Lindegren", "caroline", "lindegren123", 3, ["springgymnastik3"]));

    var userListString = JSON.stringify(userList);
    localStorage.setItem("User", userListString);
//Hvis "User" i LocalStorage ikke er tom, hentes dataene fra "User" og gemmes i userList
} else {
    var userList = JSON.parse(localStorage.getItem("User"))
}

//Tomt array, som alle sessions bliver pushet til
var sessions = [];

//Tjekker om mappen "Sessions", i LocalStorage, er tom. Hvis "Sessions" er tom, bliver dummy dataene gemt i mappen.
if (localStorage.getItem("Sessions") == null) {
    //Dummy session data, som bliver pushet til "sessions"
    sessions.push(new Session("Hussain",[userList[1],userList[3]], "springgymnastik3"))

    var sessionsString = JSON.stringify(sessions);
    localStorage.setItem("Sessions", sessionsString);
} else {
    var sessions = JSON.parse(localStorage.getItem("Sessions"))
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

            //Stringify'er userList og gemmer listen i localStorage
            var newLocalUserListString = JSON.stringify(userList);
            localStorage.setItem("User", newLocalUserListString)

            //Alerter at brugeren er oprettet
            alert("Ny coach oprettet!")
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

            //Alerter at brugeren er oprettet
            alert("Ny elev oprettet!")
        }
}

//newSession funktion
function newSession() {
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

    //Tom variabel som bliver lig med den valgte sport
    var currentSport = "";

    //Tjekker hvilke sportsgrene der er checket af, og pusher dem til sportLevels
    var sportLevel = document.getElementsByClassName("sportLevel");
    for (i=0; i<sportLevel.length; i++) {
        if (sportLevel[i].checked) {
            currentSport = sportLevel[i].value
        }
    }

    //Boolean som bliver "true"
    var sportsMatchCoach = false;

    //Tjekker om træneren underviser den sportsgren, som der er blevet krydset af.
    //Hvis det matcher bliver "sportsMatchCoach = true"
    for (i=0; i<coachSports.length; i++) {
        if (coachSports[i]==currentSport) {
            sportsMatchCoach = true
        }
    }

    //Hvis "sportsMatchCoach" forbliver "false", udløses alerten "Du underviser ikke dette hold"
    if (sportsMatchCoach == false){
        alert("Du underviser ikke dette hold")
        return;
    }

    //Tomt array til de brugere der er er tilmeldt det valgte hold
    var currentUsers = [];

    //Pusher du brugere, som går på det valgte hold, til "currentUsers"
    if (sportsMatchCoach){
        for (i=0; i<users.length; i++){
            var currentUserSports = users[i].sportTeams
            for (j=0; j<currentUserSports.length; j++){
                if (currentUserSports[j]==currentSport){
                    currentUsers.push(users[i])
                }
            }
        }
    }

    //Tom variabel som bliver lig med et facilityId
    var pickedFacility = "";

    //Gemmer den valgte facility i "pickedFacility"
    var facilityButtons = document.getElementsByClassName("facilityType");
    for (i=0; i<facilityButtons.length; i++) {
        if (facilityButtons[i].checked) {
            pickedFacility = facilityButtons[i].value
        }
    }

    //Tom variabel som bliver lig med objektet for den valgte facility
    var currentFacility = "";

    for (i=0; i<facilities.length; i++){
        if (pickedFacility == facilities[i].facilityId){
            currentFacility = (facilities[i])
        }
    }

    //Tjekker om der er plads i lokalet til det valgte antal elever
    if (currentFacility.capacity < currentUsers.length){
        alert(`Pladsmangel! Antal elever: ${currentUsers.length}. Makskapacitet på valgte hal: ${currentFacility.capacity}`);
        return;
    }
    //Boolean som forbliver "false", medmindre at den valgte facility er egnet til den valgte sport
    var sportsMatchFacility = false;

    var currentFacilitySports = currentFacility.suitableSports;
    for (i=0; i<currentFacilitySports.length; i++){
            if (currentFacilitySports[i]==currentSport){
                sportsMatchFacility = true
            }
    }

    //Hvis "sportsMatchFacility" forbliver "false", udløses alerten "Du underviser ikke dette hold"
    if (sportsMatchFacility == false){
        var slicedSport = currentSport.slice(0, -1);
        alert(`Denne hal egner sig ikke til ${slicedSport}.`);
        return;
    }

    sessions.push(new Session(coach.firstName, currentUsers, currentSport));
    var newSessionsString = JSON.stringify(sessions);
    localStorage.setItem("Sessions", newSessionsString);
    alert("Ny session oprettet!");
}