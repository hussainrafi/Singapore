//Funktion til login
class Tools {

    static getFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }

    static saveToLocalStorage(data, key){
        let stringifiedData = JSON.stringify(data);
        localStorage.setItem(key, stringifiedData);

    }

    static getAllUsers(){
        return this.getFromLocalStorage("User")
    }

    static getAllSessions(){
        return this.getFromLocalStorage("Sessions")
    }

    static getInstanceOfUserObject(userObject){
        if(userObject.hasOwnProperty("studentID")){
            return new Student(userObject.firstName, userObject.lastName, userObject.username, userObject.password, userObject.studentID, userObject.sportTeams);
        }
        else {
            return new Coach(userObject.firstName, userObject.lastName, userObject.username, userObject.password, userObject.coachID, userObject.sportTeams);
        }

    }

    static getCurrentUser(){
        let currentUser = JSON.parse(localStorage.getItem("loggedIn"));
        return this.getInstanceOfUserObject(currentUser);
    }

    static getTimeCode(year, month, date, hours, minutes = null, seconds = null){
        let newDate = new Date(year, month, date, hours, minutes, seconds);
        let timecode = newDate.getTime();
        return timecode;
    }

    static getAllStudents() {
        let arrayOfStudents = [];
        for (let i = 0; i < this.getAllUsers().length; i++) {
            if (this.getAllUsers()[i].hasOwnProperty("studentID")) {
                arrayOfStudents.push(this.getAllUsers()[i])
            }
        }
        return arrayOfStudents;
    }

    static getStudentsFromTeam(teamName){
        let team = [];
        for (let i = 0; i < Tools.getAllStudents().length; i++) {
            let userTeams = Tools.getAllStudents()[i].sportTeams;
            for (let j = 0; j < userTeams.length; j++) {
                if (userTeams[j] == teamName) {
                    team.push(Tools.getAllStudents()[i])
                }
            }
        }
        return team;
    }

    static removeUserFromSession(session, username){
        //Kunne have brugt splice, men så ville det kræve to splice funktioner, da det sidste element ikke ville kunne splices
        let students = session.students;
        let sessions = this.getAllSessions();
        let newUserList = [];
        for(let i = 0; i < students.length; i++){
            if(students[i].username != username){
                newUserList.push(students[i])
            }
        }
        for (let i = 0; i < sessions.length; i++){
            if (JSON.stringify(sessions[i]) == JSON.stringify(session) ){
                sessions[i].students = newUserList;
                this.saveToLocalStorage(sessions, "Sessions");
                return;
            }
        }
    }

    static studentRemoveSession(object) {
        let sessions = this.getAllSessions();
        for(let i=sessions.length - 1; i>=0; i--){
            if(JSON.stringify(sessions[i]) == JSON.stringify(object)){
                this.removeUserFromSession(object, this.getCurrentUser().username);
                alert("Session afmeldt!");
                location.reload();
            }
        }
    }

    static tableBuilder(arrayOfObjects){
        //Der oprettes en nyt HTML element med DOM metoden .createElement
        //Det nye HTML element bestemmes til at være en tabel, ved brug af HTML tagget "table"
        //Den nye tabel gemmes i JS variablen "table"
        let table = document.createElement("table");

        //Bruger metoden Object.keys(), som tager et objekt, og returnerer de properties objektet indeholder,
        //som et array, med en string per property, som indeholder property navnet.
        //Her returnerer metoden et array, med de properties for det objekt, som er gemt i arrayet userSessions, med index nummer 0
        //Dette array gemmes i JS variablen "fields".
        let fields = Object.keys(arrayOfObjects[0]);

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
        arrayOfObjects.forEach(function(object) {
            let row = document.createElement("tr");
            fields.forEach(function(field) {
                let cell = document.createElement("td");
                if(field == "Afmeld" || field == "Aflys" || field == "Slet"){
                    let newButton = document.createElement("button");
                    newButton.innerHTML = field;
                    newButton.onclick = function(){
                        if (field == "Afmeld"){
                            Tools.studentRemoveSession(object[field]);
                        } else if (field == "Aflys") {
                            Tools.removeSession(object[field])
                        } else {
                            //Fjerner bruger fra alle sessioner
                            let sessions = Tools.getAllSessions();
                            for (let i=sessions.length - 1; i>=0; i--){
                                Tools.removeUserFromSession(sessions[i], object.Brugernavn);
                            }
                            //Sletter bruger fra userlist
                            let userList = Tools.getAllUsers();
                            for (let i = 0; i < userList.length; i++){
                                if (userList[i].username == object.Brugernavn){
                                    if (userList.length == 1){
                                        userList.splice(-1,1)
                                    } else {
                                        userList.splice(i,1);
                                    }
                                    Tools.saveToLocalStorage(userList,"User")
                                }
                            }
                            alert("Bruger slettet og afmeldt fra tilhørende sessioner!");
                            location.reload();
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

    static checkSessions() {
        let user = this.getCurrentUser();
        let sessions = this.getAllSessions();
        let userSessions = [];
        if (user.hasOwnProperty("studentID")) {
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
                if (sessions[i].coach == user.getFullName()) {
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
        for (let i = 1; i < userSessions.length; i++) {
            for (let j = 1; j < userSessions.length; j++) {
                let session = userSessions[j];
                let pastSession = userSessions[j - 1];
                if (session.Mødetid[0] < pastSession.Mødetid[0]) {
                    userSessions[j - 1] = session;
                    userSessions[j] = pastSession;
                }
            }
        }

        //Laver en dato string til "Mødetid"
        for (let i = 0; i < userSessions.length; i++) {
            let currentSession = userSessions[i].Mødetid;
            let startDate = new Date(currentSession[0]);
            let endDate = new Date(currentSession[1] + 1000);
            let year = startDate.getFullYear();
            let month = startDate.getMonth() + 1;
            let date = startDate.getDate();
            let startTime = startDate.toLocaleTimeString();
            let endTime = endDate.toLocaleTimeString();
            userSessions[i].Mødetid = `${date}/${month}/${year} fra ${startTime.slice(0, 5)} til ${endTime.slice(0, 5)}`;
        }

        if (userSessions[0] == null) {
            let para = document.createElement("p");
            let message = document.createTextNode("Der er ikke booket nogen sessioner");
            para.appendChild(message);
            return para;
        }

        return this.tableBuilder(userSessions);
    }

    static removeSession(object) {
        let newSessionList = [];
        let sessions = this.getAllSessions();
        console.log("test");
        for(let i=sessions.length - 1; i>=0; i--){
            if(JSON.stringify(sessions[i])!= JSON.stringify(object)){
                newSessionList.push(sessions[i]);
            }
        }
        this.saveToLocalStorage(newSessionList, "Sessions");
        alert("Session aflyst!");
        location.reload();
    }

    static deleteUser() {
        let coach = this.getCurrentUser();
        let coachStudents = [];

        //Tilføjer alle trænerens elever til "coachStudents"
        for (let i = 0; i < coach.sportTeams.length; i++) {
            let studentsInCurrentTeam = Tools.getStudentsFromTeam(coach.sportTeams[i]);
            for (let j = 0; j < studentsInCurrentTeam.length; j++) {
                let student = {};
                student.Elev = Tools.getInstanceOfUserObject(studentsInCurrentTeam[j]).getFullName();
                student.Brugernavn = studentsInCurrentTeam[j].username;
                student.Slet = studentsInCurrentTeam[j];
                coachStudents.push(student)
            }
        }

        if (coachStudents[0] == null) {
            let para = document.createElement("p");
            let message = document.createTextNode("Du underviser ikke nogen elever");
            para.appendChild(message);
            return para;
        }
        return this.tableBuilder(coachStudents);
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

        let sessions = this.getAllSessions();

        //Opretter en ny session og gemmer den i localStorage under "Sessions"
        sessions.push(new Session(coachName, team, sessionFacility.facilityId, timeInterval, currentUsers));

        //Gemmer "sessions" i localStorage under nøglen "Sessions"
        this.saveToLocalStorage(sessions,"Sessions");

        if (typeof facility == "object") {
            alert("Ny session oprettet!");
        }
    }

    static logOut() {
        localStorage.removeItem("loggedIn");
    }

}