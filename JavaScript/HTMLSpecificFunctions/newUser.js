function newUser() {
    //Fornavn, efternavn, brugernavn, password, brugertype og valgte sportsgrene importeres fra tekstfelterne
    //Dette gøres ved at bruge DOM funktionen getElementById og .value
    let firstName = document.getElementById("newFirstName").value;
    let lastName = document.getElementById("newLastName").value;
    let username = document.getElementById("newUserName").value.toLowerCase();
    let password = document.getElementById("newPassword").value;
    let userTypes = document.getElementsByClassName("userType");
    let sportLevel = document.getElementsByClassName("sportLevel");

    let userList = Tools.getAllStudents();

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
        for (let i = 0; i < Tools.getAllStudents().length; i++) {
            idNumber += 1
        }

        let newStudent = new Student(firstName, lastName, username, password, idNumber, sportLevels);

        let sessions = Tools.getAllSessions();

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

        //Gemmer "userList" i localStorage
        Tools.saveToLocalStorage(userList, "User");

        //Alerter at brugeren er oprettet
        alert("Ny elev oprettet!");
        location.reload();
    }
}