function newUser() {
    //Fornavn, efternavn, brugernavn, password, brugertype og valgte sportsgrene importeres fra tekstfelterne
    //Dette gøres ved at bruge DOM funktionen getElementById og .value
    let firstName = document.getElementById("newFirstName").value;
    let lastName = document.getElementById("newLastName").value;
    let username = document.getElementById("newUserName").value.toLowerCase();
    let password = document.getElementById("newPassword").value;
    let userTypes = document.getElementsByClassName("userType");
    let sportLevel = document.getElementsByClassName("sportLevel");

    //Henter alle brugere og gemmer dem i variablen "userList"
    let userList = Tools.getAllUsers();

    //Checker om brugernavnet allerede er taget i brug:
    //Looper igennem "userList"
    for (let i = 0; i < userList.length; i++) {
        //Går ind i if-statement hvis en brugers brugernavn er lig med "username"
        if (userList[i].username == username) {
            //Alerter "Dette brugernavn er allerede i brug" og returnerer ingenting
            alert("Dette brugernavn er allerede i brug");
            return
        }
    }

    //Som udgangspunkt er brugertypen "Student", og gemmes som string i variablen "userType"
    let userType = "Student";

    //Checker om brugeren skal være coach:
    //Går ind i if-statement hvis checkboxen med id'et "userType" er checked af
        if (userTypes[0].checked) {
            //"userType" bliver lig med "Coach" og overskriver derved "Student"
            userType = "Coach"
        }

    //Tomt array som gemmes i variablen "teams", hvor de aktuelle hold bliver pushet til
    let teams = [];

    //Tjekker hvilke sportsgrene der er checket af, og pusher dem til "teams":
    //Looper igennem de radio buttons med id'et "sportLevel"
    for (let i = 0; i < sportLevel.length; i++) {
        //Går ind i if-statement, hvis den aktuelle radiobutton er checket af
        if (sportLevel[i].checked) {
            //Pusher værdien (holdet), for den aktuelle radiobutton til "teams"
            teams.push(sportLevel[i].value)
        }
    }

    //Variabel som hedder "idNumber", der om udgangspunkt er lig med nummeret "1"
    let idNumber = 1;

    //Går ind ind if-statement hvis den nye bruger skal være en coach
    if (userType == "Coach") {
        //Genererer nyt unikt coachID:
        //Looper igennem brugerlisten
        for (let i = 0; i < userList.length; i++) {
            //Går ind i if-statement hvis objektet for den aktuelle bruger har et "coachID" som property
            if (userList[i].hasOwnProperty("coachID")) {
                //Incrementer "idNumber"
                idNumber++
            }
        }

        //Opretter ny "Coach" instans og pusher instansen til "userList"
        userList.push(new Coach(firstName, lastName, username, password, idNumber, teams));

        //Gemmer "userList" i localStorage med nøglen "User"
        Tools.saveToLocalStorage(userList, "User");

        //Alerter at brugeren er oprettet
        alert("Ny coach oprettet!")

    //Hvis ikke brugeren skal være en coach, må det være en elev
    } else {
        //Genererer nyt unikt studentID:
        //Looper igennem alle elever
        for (let i = 0; i < Tools.getAllStudents().length; i++) {
            //Incrementer "idNumber"
            idNumber += 1
        }

        //Opretter ny "Student" instans og pusher instansen til "userList"
        let newStudent = new Student(firstName, lastName, username, password, idNumber, teams);

        //Henter alle sessioner som et array, og gemmer arrayet i variablen "sessions"
        let sessions = Tools.getAllSessions();

        //Tilføjer den nye bruger til alle de sessioner der er

        //Looper igennem "sessions"
        for (let i = sessions.length - 1; i >= 0; i--) {
            //Gemmer stringen med holdnavnet, for den aktuelle session, i "currentSessionTeam"
            let currentSessionTeam = sessions[i].team;
            //Looper igennem de valgte hold
            for (let j = 0; j < teams.length; j++) {
                //Går ind i if-statement hvis det aktuelle valgte hold er lig med holdet for den aktuelle session
                if (teams[j] == currentSessionTeam) {
                    //Gemmer alle properties i variabler, da sessionen bliver slettet om lidt
                    let coach = sessions[i].coach;
                    let team = sessions[i].team;
                    let facility = sessions[i].facility;
                    let timeInterval = sessions[i].timeInterval;
                    let students = sessions[i].students;
                    //Sletter den aktuelle session
                    sessions.splice(i, 1);
                    //Pusher den nye session til "students"
                    students.push(newStudent);
                    //Går ind i try-statement
                    try {
                        //Kalder "sessionBuilder()" med de variabler, de properties, som er gemt i variabler
                        let newSession = Tools.sessionBuilder(coach, team, facility, timeInterval, students);
                        //Pusher den nye session til "sessions"
                        sessions.push(newSession);
                        //Gemmer "sessions" i localStorage med nøglen "Sessions"
                        Tools.saveToLocalStorage(sessions, "Sessions")
                    //Går ind i catch-statement hvis "sessionBuilder" kaster en error og returnerer en string
                    } catch (e) {
                        //Alerter den string som "sessionBuilder()" returnerede
                        alert(e);
                        //Returnerer ingenting
                        return;
                    }
                }
            }
        }

        //Gemmer den nye student i userList
        userList.push(newStudent);

        //Gemmer "userList" i localStorage
        Tools.saveToLocalStorage(userList, "User");



        //Alerter at brugeren er oprettet og opdaterer siden
        alert("Ny elev oprettet!");
        location.reload();
    }
}