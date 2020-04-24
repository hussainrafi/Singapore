//Funktion til login
class Tools {
    //Sletter localStorage data
    //Tager en string som parameter, og sletter den data, som er gemt under den nøgle
    static getFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }

    //Gemmer i localStorage.
    //Tager den data der skal gemmes i localStorage som første parameter
    //Tager en nøgle som anden parameter, som skal angives som en string
    static saveToLocalStorage(data, key){
        let stringifiedData = JSON.stringify(data);
        localStorage.setItem(key, stringifiedData);

    }

    //Sletter den der er logget ind fra localStorage
    static logOut() {
        localStorage.removeItem("loggedIn");
    }

    //Returnerer et array med alle sessions, som er gemt i localStorage under nøglen "Sessions"
    static getAllSessions(){
        return this.getFromLocalStorage("Sessions")
    }

    //Returnerer objektet for den bruger, som er logget ind
    static getCurrentUser(){
        let currentUser = JSON.parse(localStorage.getItem("loggedIn"));
        return this.getInstanceOfUserObject(currentUser);
    }

    //Tager et bruger-objekt som parameter og returnerer en Student eller Coach instans, af objektet.
    static getInstanceOfUserObject(userObject){
        if(userObject.hasOwnProperty("studentID")){
            return new Student(userObject.firstName, userObject.lastName, userObject.username, userObject.password, userObject.studentID, userObject.sportTeams);
        }
        else {
            return new Coach(userObject.firstName, userObject.lastName, userObject.username, userObject.password, userObject.coachID, userObject.sportTeams);
        }

    }

    //Returnerer et array med alle brugere, som er gemt i localStorage under nøglen "User"
    static getAllUsers(){
        return this.getFromLocalStorage("User")
    }

    //Returnerer et array med alle elever, som er gemt i localStorage under nøglen "User"
    static getAllStudents() {
        let arrayOfStudents = [];
        for (let i = 0; i < this.getAllUsers().length; i++) {
            if (this.getAllUsers()[i].hasOwnProperty("studentID")) {
                arrayOfStudents.push(this.getAllUsers()[i])
            }
        }
        return arrayOfStudents;
    }

    static getAllFacilities (){
        return this.getFromLocalStorage("Facilities");
    }

    //Tager et hold som parameter, og returnerer et array med alle de elever, som går holdet
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

    //Returnerer en dato, i milisekunder fra 01/01/1970
    //Tager et år, måned, dato, timer som parameter, i number format
    //Kan også tage minutter og sekunder som parameter, i number format
    static getTimeCode(year, month, date, hours, minutes = null, seconds = null){
        let newDate = new Date(year, month, date, hours, minutes, seconds);
        let timecode = newDate.getTime();
        return timecode;
    }

    //Tager objektet for en session som parameter, og sletter sessionen fra "Sessions", i localStorage
    static removeSession(session) {
        //Tomt array som bliver det nye array med sessions
        let newSessionList = [];
        //Henter alle sessionerne og gemmer dem i en variabel
        let sessions = this.getAllSessions();
        //Looper igennem "sessions"
        for(let i = 0; i < sessions.length; i++){
            //Hvis en session ikke er lig med den session, som er angivet som parameter,
            //bliver sessionen pushet til "newSessionList
            if(JSON.stringify(sessions[i])!= JSON.stringify(session)){
                newSessionList.push(sessions[i]);
            }
        }
        //Gemmer det opdatedere sessions array i localStorage, med nøglen "Sessions"
        this.saveToLocalStorage(newSessionList, "Sessions");
        //Reloader siden
        location.reload();
    }

    //Tager objektet for en session og et brugernavn som parameter, og sletter brugeren fra sessionen
    static removeUserFromSession(session, username){
        //Gemmer eleverne fra sessionen i en varibel
        let students = session.students;
        //Tomt array som bliver den nye elevliste for sessionen
        let newUserList = [];
        //For loop som pusher eleverne i sessionen til "newUserList",
        //medmindre elevens brugernavn stemmer overens med det brugernavn der er angivet som parameter
        for(let i = 0; i < students.length; i++){
            if(students[i].username != username){
                newUserList.push(students[i])
            }
        }

        //Henter alle sessionerne og gemmer dem i en variabel
        let sessions = this.getAllSessions();
        //Looper igennem arrayet med sessioner
        for (let i = 0; i < sessions.length; i++){
            //Hvis sessionen er lig med den session som er angivet som parameter,
            //bliver "newUserList" den nye elevliste for sessionen
            //Derefter gemmes det opdaterede sessions array i localStorage med nøglen "Sessions"
            if (JSON.stringify(sessions[i]) == JSON.stringify(session) ){
                sessions[i].students = newUserList;
                this.saveToLocalStorage(sessions, "Sessions");
                return;
            }
        }
    }

    //Tager et et array med objekter og returnerer en tabel
    //Property-navnene bliver kolonnenavnene
    //Property-værdierne bliver rækkerne
    static tableBuilder(arrayOfObjects){
        //Der oprettes en nyt Views element med DOM metoden .createElement
        //Det nye Views element bestemmes til at være en tabel, ved brug af Views tagget "table"
        //Den nye tabel gemmes i JS variablen "table"
        let table = document.createElement("table");

        //Bruger metoden Object.keys(), som tager et objekt, og returnerer de properties objektet indeholder,
        //som et array, med en string per property, som indeholder property navnet.
        //Her returnerer metoden et array, med de properties for det objekt, som er gemt i arrayet userSessions, med index nummer 0
        //Dette array gemmes i JS variablen "fields".
        let fields = Object.keys(arrayOfObjects[0]);

        //Der oprettes en nyt Views element med DOM metoden .createElement
        //Det nye Views element bestemmes til at være en tabelrække, ved brug af Views tagget "tr"
        //Den nye tabelrække gemmes i JS variablen "headRow"
        let headRow = document.createElement("tr");

        //Bruger Higher Order funktionen .forEach(), som tager et array og looper igennem alle index'ne
        //For hver værdi i arrayet executes en funktion, der tager værdien som argument.
        //I dette tilfælde looper den igennem alle værdierne i arrayet "fields og executer en funktion med den aktuelle værdi som argument"
        fields.forEach(function(field) {

            //Der oprettes en nyt Views element med DOM metoden .createElement
            //Det nye Views element bestemmes til at være en tabeloverskrift, ved brug af Views tagget "th"
            //Den nye tabel gemmes i JS variablen "headCell"
            let headCell = document.createElement("th");

            //Ved brug af DOM metoden .createTextNode(), omdannes den string, som "field" repræsenterer, til en node
            //"field" skal omdannes til en node, da noden bruges som parameter i .appendChild()
            //.appendChild() metoden tager en node (her "field") og sætter det til at være lig med værdien,
            //for det valgte Views element (her "headCell)
            headCell.appendChild(document.createTextNode(field));

            //.appendChild() bruges igen, for at tilføje tabelOverskriften "headCell" til tabelrækken "headRow"
            headRow.appendChild(headCell);
        });
        //.appendChild() bruges igen, for at tilføje tabelrækken "headRow" til tabellen "table"
        table.appendChild(headRow);

        //Laver tabel rækker:

        //Går igennem hvert objekt i arrayet
        arrayOfObjects.forEach(function(object) {
            //For hvert objekt oprettes en række
            let row = document.createElement("tr");
            //Går igennem hver property i objektet
            fields.forEach(function(field) {
                //Opretter en celle for hver property
                let cell = document.createElement("td");

                //Tjekker om property-navnet er lig med "Afmeld", "Aflys eller "Slet":
                if(field == "Afmeld" || field == "Aflys" || field == "Slet"){

                    //Hvis dette er "true", oprettes der en knap, med property-navnet på knappen
                    let newButton = document.createElement("button");
                    newButton.innerHTML = field;
                    newButton.onclick = function(){

                        //Hvis property-navnet er lig med "Afmeld", vil knappen kalde "removeUserSession()",
                        //med objektet for en session og et brugernavn som parameter, når knappen bliver klikket
                        if (field == "Afmeld"){
                            let sessions = Tools.getAllSessions();
                            for(let i = 0; i < sessions.length; i++) {
                                if (JSON.stringify(sessions[i]) == JSON.stringify(object[field])) {
                                    Tools.removeUserFromSession(object[field], Tools.getCurrentUser().username);
                                    //Alerter "Session afmeldt!"
                                    alert("Session afmeldt!");
                                    //og siden opdateres derefter
                                    location.reload();
                                }
                            }

                        //Hvis property-navnet er lig med "Aflys", vil knappen kalde "removeSession()",
                        //med objektet for en session som parameter, når knappen bliver klikket
                        } else if (field == "Aflys") {
                            Tools.removeSession(object[field]);
                            //Alerter "Session aflyst!"
                            alert("Session aflyst!");

                        //Hvis property-navnet er lig med "Slet", vil knappen kalde "removeUserSession()",
                        //med objektet for en session og et brugernavn som parameter.
                        //Derudover slettes det brugerobjekt, som property'en ligger i, fra "User" i localStorage
                        } else {
                            let sessions = Tools.getAllSessions();
                            for (let i=sessions.length - 1; i>=0; i--){
                                Tools.removeUserFromSession(sessions[i], object.Brugernavn);
                            }
                            let userList = Tools.getAllUsers();
                            for (let i = 0; i < userList.length; i++){
                                if (userList[i].username == object.Brugernavn){
                                    userList.splice(i,1);
                                    Tools.saveToLocalStorage(userList,"User")
                                }
                            }
                            alert("Bruger slettet og afmeldt fra tilhørende sessioner!");
                            location.reload();
                        }

                    };
                    //Slutteligt sættes knappen ind i cellen
                    cell.appendChild(newButton);

                //Hvis ikke er lig med "Afmeld", "Aflys eller "Slet", vil cellen blive fyldt med property-værdien
                } else {
                    cell.appendChild(document.createTextNode(object[field]));
                }

                //Hver celle bliver sat ind i objektes række
                row.appendChild(cell);
            });
            //Hver række bliver sat ind i tabellen
            table.appendChild(row);
        });
        //Tabellen bliver returneret
        return table;
    }

    //Henter data om den bruger der er logget ind, og kalder "tableBuilder()", med et array, med modificeret data
    static checkSessions() {
        //Henter den bruger der er logget ind, og gemmer den i variablen "user"
        let user = this.getCurrentUser();
        //Henter sessionerne fra localStorage og gemmer arrayet i variablen "sessions"
        let sessions = this.getAllSessions();
        //Tomt array, som der bliver pushet objekter til
        let userSessions = [];

        //Looper igennem alle sessionerne
        for (let i = 0; i < sessions.length; i++) {
            //Tomt objekt som gemmes i variablen "currentSession"
            let currentSession = {};
            //Går ind i if-statemented, hvis det objekt der er logget ind, har property'en "studentID"
            if (user.hasOwnProperty("studentID")) {
                //Gemmer elever i den aktuelle session i "currentStudents"
                let currentStudents = sessions[i].students;
                //Looper igennem "currentStudents"
                for (let j = 0; j < currentStudents.length; j++) {
                    //Går ind i if-statement hvis brugeren er tilmeldt den aktuelle session,
                    //ved at checke om de to "studentID"'s er ens
                    if (currentStudents[j].studentID == user.studentID) {
                        //Opretter nye properties til currentSession
                        //Navnene på de nye properties, er de navne der bliver navnene på kolonnerne i tabellen
                        currentSession.Træner = sessions[i].coach;
                        currentSession.Hold = sessions[i].team;
                        currentSession.Facilitet = sessions[i].facility;
                        currentSession.Mødetid = sessions[i].timeInterval;
                        //"Afmeld" kommer til at holde på objektet for den aktuelle session, da det skal bruges som parameter,
                        //i "removeUserFromSession()", hvis eleven vil afmelde sig fra sessionen
                        currentSession.Afmeld = sessions[i];
                        //Pusher den modicerede session ("currentSession") til "userSessions"
                        userSessions.push(currentSession)
                    }
                }
            //Går ind i else-state, hvis ikke brugeren er en elev, da det derfor ellers må være en træner
            } else {

                //Går ind i if-statement, hvis trænerens navn i sessionen stemmer overens, med brugerens fulde navn
                if (sessions[i].coach == user.getFullName()) {
                    //Opretter nye properties til currentSession
                    //Navnene på de nye properties, er de navne der bliver navnene på kolonnerne i tabellen
                    currentSession.Hold = sessions[i].team;
                    currentSession.Facilitet = sessions[i].facility;
                    currentSession.Mødetid = sessions[i].timeInterval;
                    //"Aflys" kommer til at holde på objektet for den aktuelle session, da det skal bruges som parameter,
                    //i "removeSession()", hvis træneren vil aflyse sessionen
                    currentSession.Aflys = sessions[i];
                    //Pusher den modicerede session ("currentSession") til "userSessions"
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
            //"Mødetid" bliver lig med en string, med start og slut tidspunkt
            //bruger "slice.()", da der ellers ville komme sekunder med i start- og sluttidspunktet
            userSessions[i].Mødetid = `${date}/${month}/${year} fra ${startTime.slice(0, 5)} til ${endTime.slice(0, 5)}`;
        }

        //Besked som bliver vist hvis ikke der er booket nogle sessioner i brugerens navn:
        //Går ind i if-statement, hvis ikke der er nogle sessioner i "userSessions"
        if (userSessions[0] == null) {
            //Laver et Views paragraph tag og gemmer det i variablen "para"
            let para = document.createElement("p");
            //Gemmer stringen "Der er ikke booket nogen sessioner" i variablen "message"
            let message = document.createTextNode("Der er ikke booket nogen sessioner");
            //Sætter "message" ind i paragraphen "para"
            para.appendChild(message);
            //Returnerer "para"
            return para;
        }

        //Returnerer et kald til "tableBuilder()", med "userSessions" som parameter
        return this.tableBuilder(userSessions);
    }

    //Henter data om de elever, der er tilknytter den træner der er logget ind, og kalder "tableBuilder()",
    //med et array, med modificeret data
    static deleteUser() {
        //Henter objekter for den bruger der er logget ind, og gemmer objekter i variablen "coach"
        let coach = this.getCurrentUser();

        //Tomt array, som objekterne for de elever, der bliver undervist af træneren, bliver pushet til
        let coachStudents = [];

        //Pusher trænerens elever til "coachStudents":
        //Looper igennem de hold som træneren underviser
        for (let i = 0; i < coach.sportTeams.length; i++) {
            //Henter de elever der går på det aktuelle hold, og gemmer dem som et array,
            //i variablen "studentsInCurrentTeam"
            let studentsInCurrentTeam = Tools.getStudentsFromTeam(coach.sportTeams[i]);
            //Looper igennem alle eleverne på det aktuelle hold
            for (let j = 0; j < studentsInCurrentTeam.length; j++) {
                //Tomt objekt som gemmes i variablen "student"
                let student = {};
                //Opretter nye properties til currentSession
                //Navnene på de nye properties, er de navne der bliver navnene på kolonnerne i tabellen
                student.Elev = Tools.getInstanceOfUserObject(studentsInCurrentTeam[j]).getFullName();
                student.Brugernavn = studentsInCurrentTeam[j].username;
                //"Slet" kommer til at holde på objektet for den aktuelle elev, da det skal bruges som parameter,
                //i "removeUserFromSession()", hvis træneren vil slette eleven fra brugerlisten.
                student.Slet = studentsInCurrentTeam[j];
                //Pusher "student" til "coachStudents"
                coachStudents.push(student)
            }
        }

        //Besked som bliver vist hvis ikke træneren underviser nogle elever:
        //Går ind i if-statement, hvis ikke der er nogle elever i "coachStudents"
        if (coachStudents[0] == null) {
            //Laver et Views paragraph tag og gemmer det i variablen "para"
            let para = document.createElement("p");
            //Gemmer stringen "Du underviser ikke nogen elever" i variablen "message"
            let message = document.createTextNode("Du underviser ikke nogen elever");
            //Sætter "message" ind i paragraphen "para"
            para.appendChild(message);
            //Returnerer "para"
            return para;
        }
        //Returnerer et kald til "tableBuilder()" med "coachStudents" som parameter
        return this.tableBuilder(coachStudents);
    }

    //Opretter en ny session, og gemmer den nye sessionsliste i localStorage med nøglen "Sessions"
    //Tager en trænerens fulde navn, et holdnavn og et facilitynavn, i stringformat, som parameter
    //Tager derudover også et array med to tidskoder og et array med elever som parameter
    static sessionBuilder(coachName, team, facility, timeInterval, currentUsers) {

        //Når man kalder "newUser()", kalder den "sessionBuilder()", for at tjekke at der er plads til den nye elev,
        //i de sessioner, der allerede er oprettet for de hold, som den nye elev skal tilmeldes.
        //Når "newUser()" kalder "sessionBuilder" er det med et facilityID (som er en string), i facility-parametren.
        //Da "sessionBuilder()" skal tjekke om der er plads til den nye elev, skal objektet for faciliteten findes,
        //ud fra facilityID'et

        //Gemmer facility parametren, i variablen "sessionFacility"
        let sessionFacility = facility;

        let facilities = this.getAllFacilities();

        //Går ind i if-statement, hvis facilityparametren er lig med en string (hvilket vil betyde, at det er newUser(),
        //der har kaldt sessionBuilder())
        if (typeof facility == 'string') {
            //Looper igennem facilities
            for (let i = 0; i < facilities.length; i++) {
                //Går ind i if-statement hvis de to facilityID's er ens
                if (facilities[i].facilityId == sessionFacility) {
                    //Gemmer objektet for faciliteten i "sessionFacility" og overskriver derved facility-parametren
                    sessionFacility = facilities[i]
                }
            }
        }

        //Tjekker om der er plads til det valgte hold, i lokalet:
        //Går ind i if-statement, hvis den nye brugerliste (currentUsers) ikke indeholder flere elementer,
        //end hvad der plads til i den aktuelle facilitet.
        if (sessionFacility.capacity < currentUsers.length) {

            //Fejlbesked hvis det er newUser() der har kaldt metoden:
            //Går ind i if-statement, hvis facilityparametren er lig med en string (hvilket vil betyde, at det er newUser(),
            //der har kaldt sessionBuilder())
            if (typeof facility == 'string') {
                //newUser() har kaldt sessionBuilder() med et try/catch-statement
                //Kaster en exception (error) tilbage til newUser, i string-format
                throw (`Elev kunne ikke oprettes, da der ikke er plads til mere end ${sessionFacility.capacity} elever i faciliteten: "${sessionFacility.facilityId}", som det valgte hold "${team}" har en planlagt session i.`);
            }
            //Fejlbesked hvis det er newSession() der har kaldt metoden:
            //Alerter at der er pladsmangel
            alert(`Pladsmangel! Antal elever ${currentUsers.length}. Makskapacitet på valgte facilitet: ${sessionFacility.capacity}`);
            return;
        }

        //Opretter en ny instans af Session-klassen
        let newSession = new Session(coachName, team, sessionFacility.facilityId, timeInterval, currentUsers);


        //Returnerer newSession til newUser():
        //Går ind i if-statement hvis facility er lig med en string
        if (typeof facility == "string"){
            //Returnerer newSession
            return newSession
        }

        //Henter alle sessionerne og gemmer dem i variablen "sessions"
        let sessions = this.getAllSessions();

        //Opretter en ny instans af Session-klassen, og pusher instansen til "sessions"
        sessions.push(newSession);

        //Gemmer "sessions" i localStorage under nøglen "Sessions"
        this.saveToLocalStorage(sessions,"Sessions");

        //Besked hvis det er newSession() der har kaldt metoden:
        //Går ind i if-statement hvis facility er lig med et objekt, alertes der "Ny session oprettet!"
        if (typeof facility == "object") {
            alert("Ny session oprettet!");
        }
    }
}