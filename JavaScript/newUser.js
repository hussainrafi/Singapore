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

    for (i=0; i<userList.length; i++) {
        if (userList[i].username == username){
            alert("Dette brugernavn er allerede i brug");
            return
        }
    }

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