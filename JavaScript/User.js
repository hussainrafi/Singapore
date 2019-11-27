// User klasse
class User {
    constructor(firstName, lastName, username, password, sportTeams){
         this.firstName = firstName;
         this.lastName = lastName;
         this.username = username;
         this.password = password;
         this.sportTeams = sportTeams;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static login() {
        //Starter med at hente input fra HTML form
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        //for loop som kører alle user objekter igennem og ser om username og password findes og matcher
        for (let i = 0; i < userList.length; i++) {
            if (username.toLowerCase().trim() == userList[i].username && password == userList[i].password) {
                if (userList[i].coachID > 0) {
                    window.location.replace("AdminIndex.html");
                    let logOn = JSON.stringify(userList[i]);
                    localStorage.setItem("loggedIn", logOn);

                } else {
                    window.location.replace("StudentIndex.html");
                    let logOn = JSON.stringify(userList[i]);
                    localStorage.setItem("loggedIn", logOn);
                }
                return
            }
        }
        //Fejlbesked hvis username og password ikke matcher
        alert("Brugernavn eller adgangskode findes ikke");
    }

    static logOut() {
        localStorage.removeItem("loggedIn");
    }

    static checkSessions() {
        let user = Tools.getCurrentUser();
        let userSessions = [];
        if(user.hasOwnProperty("studentID")){
            for (let i = 0; i < sessions.length; i++) {
                let currentStudents = sessions[i].students;
                for (let j = 0; j < currentStudents.length; j++) {
                    let currentSession = {};
                    if (currentStudents[j].studentID == user.studentID) {
                        currentSession.Træner = sessions[i].coach;
                        currentSession.Hold = sessions[i].team;
                        currentSession.Facilitet = sessions[i].facility;
                        currentSession.Mødetid = sessions[i].timeInterval;
                        currentSession.Afmeld = sessions[i];
                        userSessions.push(currentSession)
                    }
                }
            }
        } else {
            for (let i = 0; i < sessions.length; i++) {
                if(sessions[i].coach == user.getFullName()){
                    let currentSession = {};
                    currentSession.Hold = sessions[i].team;
                    currentSession.Facilitet = sessions[i].facility;
                    currentSession.Mødetid = sessions[i].timeInterval;
                    currentSession.Aflys = sessions[i];
                    userSessions.push(currentSession)
                }
            }
        }

        //Sorterer sessionerne efter dato
        for (let i=1; i < userSessions.length; i++) {
            for (let j = 1; j < userSessions.length; j++) {
                let session = userSessions[j];
                let pastSession = userSessions[j - 1];
                if (session.Mødetid[0] < pastSession.Mødetid[0]) {
                    userSessions[j - 1] = session;
                    userSessions[j] = pastSession;
                }
            }
        }

        for (let i=0; i < userSessions.length; i++) {
            let currentSession = userSessions[i].Mødetid;
            let startDate = new Date (currentSession[0]);
            let endDate = new Date (currentSession[1]+1000);
            let year = startDate.getFullYear();
            let month = startDate.getMonth()+1;
            let date = startDate.getDate();
            let startTime = startDate.toLocaleTimeString();
            let endTime = endDate.toLocaleTimeString();
            userSessions[i].Mødetid = `${date}/${month}/${year} fra ${startTime.slice(0,5)} til ${endTime.slice(0,5)}`;
        }

        if (userSessions[0] == null){
            let para = document.createElement("p");
            let message = document.createTextNode("Der er ikke booket nogen sessioner");
            para.appendChild(message);
            return para;
        }

        //Der oprettes en nyt HTML element med DOM metoden .createElement
        //Det nye HTML element bestemmes til at være en tabel, ved brug af HTML tagget "table"
        //Den nye tabel gemmes i JS variablen "table"
        let table = document.createElement("table");

        //Bruger metoden Object.keys(), som tager et objekt, og returnerer de properties objektet indeholder,
        //som et array, med en string per property, som indeholder property navnet.
        //Her returnerer metoden et array, med de properties for det objekt, som er gemt i arrayet userSessions, med index nummer 0
        //Dette array gemmes i JS variablen "fields".
        let fields = Object.keys(userSessions[0]);

        //Der oprettes en nyt HTML element med DOM metoden .createElement
        //Det nye HTML element bestemmes til at være en tabelrække, ved brug af HTML tagget "tr"
        //Den nye tabelrække gemmes i JS variablen "headRow"
        let headRow = document.createElement("tr");

        //Bruger Higher Order funktionen .forEach(), som tager et array og looper igennem alle index'ne
        //For hver værdi i arrayet executes en funktion, der tager værdien som argument.
        //I dette tilfælde looper den igennem alle værdierne i arrayet "fields og executer en funktion med den aktuelle værdi som argument"
        fields.forEach(function(field) {

            //Der oprettes en nyt HTML element med DOM metoden .createElement
            //Det nye HTML element bestemmes til at være en tabeloverskrift, ved brug af HTML tagget "th"
            //Den nye tabel gemmes i JS variablen "headCell"
            let headCell = document.createElement("th");

            //Ved brug af DOM metoden .createTextNode(), omdannes den string, som "field" repræsenterer, til en node
            //"field" skal omdannes til en node, da noden bruges som parameter i .appendChild()
            //.appendChild() metoden tager en node (her "field") og sætter det til at være lig med værdien,
            //for det valgte HTML element (her "headCell)
            headCell.appendChild(document.createTextNode(field));

            //.appendChild() bruges igen, for at tilføje tabelOverskriften "headCell" til tabelrækken "headRow"
            headRow.appendChild(headCell);
        });
        //.appendChild() bruges igen, for at tilføje tabelrækken "headRow" til tabellen "table"
        table.appendChild(headRow);

        //Laver tabel rækker
        userSessions.forEach(function(object) {
            let row = document.createElement("tr");
            fields.forEach(function(field) {
                let cell = document.createElement("td");
                if(field == "Afmeld" || field == "Aflys" ){
                    let newButton = document.createElement("button");
                    newButton.innerHTML = field;
                    newButton.onclick = function(){
                        if (field == "Afmeld"){
                            Student.studentRemoveSession(object[field])
                        } else {
                            Coach.removeSession(object[field])
                        }

                    };
                    cell.appendChild(newButton);

                } else {
                    cell.appendChild(document.createTextNode(object[field]));
                }

                row.appendChild(cell);
            });
            table.appendChild(row);
        });
        return table;
    }

    static sessionBuilder(coachName, team, facility, timeInterval, currentUsers) {

        let sessionFacility = facility;

        if (typeof facility == 'string') {
            for (let i = 0; i < facilities.length; i++) {
                if (facilities[i].facilityId == sessionFacility) {
                    sessionFacility = facilities[i]
                }
            }
        }

        //Tjekker om der er plads til det valgte hold, i lokalet
        if (sessionFacility.capacity < currentUsers.length) {
            if (typeof facility == 'string') {
                throw (`Elev kunne ikke oprettes, da der ikke er plads til mere end ${sessionFacility.capacity} elever i faciliteten: "${sessionFacility.facilityId}", som det valgte hold "${team}" har en planlagt session i.`);
            }
            alert(`Pladsmangel! Antal elever ${currentUsers.length}. Makskapacitet på valgte facilitet: ${sessionFacility.capacity}`);
            return;
        }

        //Opretter en ny session og gemmer den i localStorage under "Sessions"
        sessions.push(new Session(coachName, team, sessionFacility.facilityId, timeInterval, currentUsers));

        //Gemmer "sessions" i localStorage under nøglen "Sessions"
        Tools.saveToLocalStorage(sessions,"Sessions");

        if (typeof facility == "object") {
            alert("Ny session oprettet!");
        }
    }
}

//Coach klasse, som er nedarvet fra User
class Coach extends User{
    constructor(firstName, lastName, username, password, coachID, sportTeams){
        super(firstName, lastName, username, password, sportTeams);
        this.coachID = coachID;
    }

    static newUser() {
        //Fornavn, efternavn, brugernavn, password, brugertype og valgte sportsgrene importeres fra tekstfelterne
        //Dette gøres ved at bruge DOM funktionen getElementById og .value
        let firstName = document.getElementById("newFirstName").value;
        let lastName = document.getElementById("newLastName").value;
        let username = document.getElementById("newUserName").value.toLowerCase();
        let password = document.getElementById("newPassword").value;
        let userTypes = document.getElementsByClassName("userType");
        let sportLevel = document.getElementsByClassName("sportLevel");

        //Checker om brugernavnet allerede er taget i brug
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username == username) {
                alert("Dette brugernavn er allerede i brug");
                return
            }
        }

        //Tom string som brugertypen bliver pushet til
        let userType = "";

        //Checker om brugeren skal være coach eller elev
        for (let i = 0; i < userTypes.length; i++) {
            if (userTypes[i].checked) {
                userType = "Coach"
            } else {
                userType = "Student"
            }
        }

        //Tomt array til sportsgrene
        let sportLevels = [];

        //Tjekker hvilke sportsgrene der er checket af, og pusher dem til sportLevels
        for (let i = 0; i < sportLevel.length; i++) {
            if (sportLevel[i].checked) {
                sportLevels.push(sportLevel[i].value)
            }
        }

        //Genererer nyt unikt coachID
        if (userType == "Coach") {
            let idNumber = 1;
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].coachID >= 0) {
                    idNumber += 1
                }
            }
            //Opretter ny coach instans og gemmer brugeren i local storage
            userList.push(new Coach(firstName, lastName, username, password, idNumber, sportLevels));

            //Stringify'er userList og gemmer listen i localStorage
            Tools.saveToLocalStorage(userList, "User");

            //Alerter at brugeren er oprettet
            alert("Ny coach oprettet!")
        } else {
            //Genererer nyt unikt studentID
            let idNumber = 1;
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].hasOwnProperty("studentID")) {
                    idNumber += 1
                }
            }

            let newStudent = new Student(firstName, lastName, username, password, idNumber, sportLevels);

            for (let i = sessions.length - 1; i >= 0; i--) {
                let currentSessionTeam = sessions[i].team;
                for (let j = 0; j < sportLevels.length; j++) {
                    if (sportLevels[j] == currentSessionTeam) {
                        let coach = sessions[i].coach;
                        let team = sessions[i].team;
                        let facility = sessions[i].facility;
                        let timeInterval = sessions[i].timeInterval;
                        let students = sessions[i].students;
                        students.push(newStudent);
                        sessions.splice(i, 1);
                        try {
                            this.sessionBuilder(coach, team, facility, timeInterval, students);
                        } catch (e) {
                            alert(e);
                            return;
                        }
                    }
                }
            }

            //Gemmer den nye student i userList
            userList.push(newStudent);

            //Stringify'er userList og gemmer listen i localStorage
            let newLocalUserListString = JSON.stringify(userList);
            localStorage.setItem("User", newLocalUserListString);

            //Alerter at brugeren er oprettet
            alert("Ny elev oprettet!")
        }
    }

    static newSession() {
        //Tom variabel som bliver lig med den sport, som er blevet valgt
        let currentSport = document.getElementById("sportLevel").value;

        //Tjekker hvilke sportsgrene der er checket af, og pusher dem til sportLevels
        /*var sportLevel = document.getElementsByClassName("sportLevel");
        for (i=0; i<sportLevel.length; i++) {
            if (sportLevel[i].checked) {
                currentSport = sportLevel[i].value
            }
        }*/

        //Tom variabel som bliver lig med et facilityId
        let pickedFacility = document.getElementById("facilityType").value;

        //Gemmer den valgte facility i "pickedFacility"
        /*var facilityButtons = document.getElementsByClassName("facilityType");
        for (i=0; i<facilityButtons.length; i++) {
            if (facilityButtons[i].checked) {
                pickedFacility = facilityButtons[i].value
            }
        }*/

        //Henter tidsinfo om sessionen, og gemmer em i variabler
        let bookingYear = document.getElementById("sessionYear").value;
        let bookingMonth = document.getElementById("sessionMonth").value;
        let bookingDay = document.getElementById("sessionDay").value;
        let bookingHour = document.getElementById("sessionHour").value;
        let bookingMinute = document.getElementById("sessionMinute").value;
        let durationHours = document.getElementById("durationHours").value;
        let durationMinute = document.getElementById("durationMinute").value;

        //Array med alle de udfyldte informationer
        let typedData = [currentSport, pickedFacility, bookingYear, bookingMonth, bookingDay, bookingHour, bookingMinute, durationHours, durationMinute];

        //Checker om alle tidsinformationerne er udfyldt
        for (let i = 0; i < typedData.length; i++) {
            if (typedData[i] == "notDefined") {
                alert("Alle felter felter skal udfyldes");
                return;
            }
        }

        //Tom variabel som bliver lig med objektet for den valgte facility
        let currentFacility = null;

        for (let i = 0; i < facilities.length; i++) {
            if (pickedFacility == facilities[i].facilityId) {
                currentFacility = facilities[i]
            }
        }

        //Henter den træner der er logget ind
        let coach = Tools.getCurrentUser();

        //Boolean som bliver "true"
        let sportsMatchCoach = false;

        //Tjekker om træneren underviser den sportsgren, som der er blevet krydset af.
        //Hvis det matcher bliver "sportsMatchCoach = true"
        for (let i = 0; i < coach.sportTeams.length; i++) {
            if (coach.sportTeams[i] == currentSport) {
                sportsMatchCoach = true;
            }
        }

        //Hvis "sportsMatchCoach" forbliver "false", udløses alerten "Du underviser ikke dette hold"
        if (sportsMatchCoach == false) {
            alert("Du underviser ikke dette hold");
            return;
        }

        //Boolean som forbliver "false", medmindre at den valgte facility er egnet til den valgte sport
        let sportsMatchFacility = false;

        let currentFacilitySports = currentFacility.suitableSports;
        for (let i = 0; i < currentFacilitySports.length; i++) {
            if (currentFacilitySports[i] == currentSport) {
                sportsMatchFacility = true
            }
        }

        //Hvis "sportsMatchFacility" forbliver "false", udløses alerten "Du underviser ikke dette hold"
        if (sportsMatchFacility == false) {
            alert(`Den valgte facilitet egner sig ikke til den valgte sport.`);
            return;
        }


        //Gemmer tidskoden for starten af sessionen som millisekunder
        let startTimecode = Tools.getTimeCode(bookingYear, bookingMonth, bookingDay, bookingHour, bookingMinute);

        //Opretter tidkoden for det seneste tidspunkt, som sessionen må slutte
        let latestTimecode = Tools.getTimeCode(bookingYear, bookingMonth, bookingDay, 22, 0);

        //Gemmer tidskoden for sessionsvarigheden som millisekunder
        let durationTimecode = Tools.getTimeCode(1970, 0, 1, durationHours, durationMinute - 1, 59);

        //Gemmer tidskoden for slutningen af sessionen som millisekunder
        let endTimecode = startTimecode + durationTimecode;

        //Tomt array hvor sessioner med den valgte facility bliver gemt
        let sessionsInCurrentFacility = [];

        //Pusher session til "sessionsInCurrentFacility", hvis sessionen bliver afholdt i den valgte facility
        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].facility == currentFacility.facilityId) {
                sessionsInCurrentFacility.push(sessions[i])
            }
        }

        //Checker om sluttidspunktet er efter lukketid
        if (endTimecode > latestTimecode) {
            alert("Sluttidspunktet er efter lukketiden 22.00.");
            return;
        }

        //Checker om tidsintervallet overlapper med andre sessioner i samme facility
        for (let i = 0; i < sessionsInCurrentFacility.length; i++) {
            let currentInterval = sessionsInCurrentFacility[i].timeInterval;
            if (currentInterval[0] <= startTimecode && startTimecode <= currentInterval[1]
                || currentInterval[0] <= endTimecode && endTimecode <= currentInterval[1]) {
                alert("Overlappende sessioner");
                return;
            }
        }

        //Gemmer tidsintervallet i et array
        let timeInterval = [startTimecode, endTimecode];

        let students = [];

        //Looper igennem alle brugerne og pusher alle elever til "students"
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].hasOwnProperty("studentID")) {
                students.push(userList[i])
            }
        }

        //Tomt array til de brugere der er er tilmeldt det valgte hold
        let currentUsers = [];

        //Pusher du brugere, som går på det valgte hold, til "currentUsers"
        for (let i = 0; i < students.length; i++) {
            let currentUserSports = students[i].sportTeams;
            for (let j = 0; j < currentUserSports.length; j++) {
                if (currentUserSports[j] == currentSport) {
                    currentUsers.push(students[i])
                }
            }
        }
        this.sessionBuilder(coach.getFullName(), currentSport, currentFacility, timeInterval, currentUsers)
    }

    static removeSession(object) {
        let newSessionList = [];
        for(let i=sessions.length - 1; i>=0; i--){
            if(sessions[i] != object){
                newSessionList.push(sessions[i]);
            }
        }

        let sessionsString = JSON.stringify(newSessionList);
        localStorage.setItem("Sessions", sessionsString);
        alert("Session aflyst!");
        location.reload();
    }
}
//Student klasse, som er nedarvet fra User
class Student extends User{
    constructor(firstName, lastName, username, password, studentID, sportTeams){
      super(firstName, lastName, username, password, sportTeams);
      this.studentID = studentID;
    }

    static studentRemoveSession(object) {
        for(let i=sessions.length - 1; i>=0; i--){
            if(sessions[i] == object){
                //Kunne have brugt slice, men så ville det kræve to slice funktioner, da det sidste element ikke ville kunne splices
                let students = sessions[i].students;
                let loggedInStudent = Tools.getFromLocalStorage("loggedIn");
                let newUserList = [];
                for(let j = 0; j < students.length; j++){
                    if(students[j].studentID != loggedInStudent.studentID){
                        newUserList.push(students[j])
                    }
                }
                sessions[i].students = newUserList;
                let sessionsString = JSON.stringify(sessions);
                localStorage.setItem("Sessions", sessionsString);
                alert("Session afmeldt!");
                location.reload();
            }
        }
    }
}

//Tomt array, som alle brugere bliver pushet til
let userList = [];

//Tjekker om mappen "User", i LocalStorage, er tom. Hvis "User" er tom, bliver dummy dataene gemt i mappen.
if (localStorage.getItem("User") == null) {
    //Dummy user data, som bliver pushet til "userList"
    userList.push(new Coach("Hussain", "Rafi", "hussain", "rafi123", 1, ["Fodbold 1. hold", "Springgymnastik 3. hold"]));
    userList.push(new Student("Philip", "Burleigh", "philip", "burleigh123", 1, ["Tennis 2. hold", "Springgymnastik 3. hold"]));
    userList.push(new Student("Andreas", "Krogh", "andreas", "krogh123", 2, ["Fodbold 3. hold", "Tennis 3. hold"]));
    userList.push(new Student("Caroline", "Lindegren", "caroline", "lindegren123", 3, ["Springgymnastik 3. hold"]));

    //Gemmer til localStorage
    Tools.saveToLocalStorage(userList,"User");
//Hvis "User" i LocalStorage ikke er tom, hentes dataene fra "User" og gemmes i userList
} else {
    userList = Tools.getFromLocalStorage("User")
}
