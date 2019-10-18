// User klasse
class User {
    constructor(firstName, lastName, username, password, sportLevel){
         this.firstName = firstName;
         this.lastName = lastName;
         this.username = username;
         this.password = password;
         //this.sportLevel = sportLevel;
     }
}
//Coach klasse, som er nedarvet fra User
class Coach extends User{
    constructor(firstName, lastName, username, password, coachID){
        super(firstName, lastName, username, password);
        this.coachID = coachID;
    }
}
//Student klasse, som er nedarvet fra User
class Student extends User{
    constructor(firstName, lastName, username, password, studentID){
      super(firstName, lastName, username, password);
      this.studentID = studentID;
    }
}

//Tjekker om LocalStorage er tom. Hvis Local storage er tom, bliver de harcodede brugere gemt i local storage.
if (localStorage.getItem("User") == null) {
    var userList = [];
    //Dummy user data, som objekter der bliver pushet til et empty array
    userList.push(new Coach("Hussain", "Rafi", "hussain", "rafi123", 1));
    userList.push(new Student("Philip", "Burleigh", "philip", "burleigh123", 1));
    userList.push(new Student("Andreas", "Krogh", "andreas", "krogh123", 2));
    userList.push(new Student("Caroline", "Lindegren", "caroline", "lindegren123", 3));

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
    for(i = 0; i< storedUsersList.length; i++){
        if(username.toLocaleLowerCase().trim() == storedUsersList[i].username && password == storedUsersList[i].password){
            console.log(username.trim() + " er logget ind" )
            if (storedUsersList[i].coachID > 0){
                window.location.replace("AdminIndex.html");
            } else {
                    window.location.replace("StudentIndex.html");
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
        var userTypes = document.getElementsByClassName('userType');
        var len = userTypes.length;
        var userType = "";

        var i = 0;
        for (i=0; i<len; i++) {
            if (userTypes[i].checked) {
                userType = "Coach"
            } else {
                userType = "Student"
            }
        }

        //Fornavn, efternavn, brugernavn og password importeres
        var firstName = document.getElementById('newFirstName').value;
        var lastName = document.getElementById('newLastName').value;
        var username = document.getElementById('newUsername').value;
        var password = document.getElementById('newPassword').value;

        //Brugerne i local storage importeres
        var storedUsersList = JSON.parse(localStorage.getItem("User"));

        if(userType == "Coach"){
            //Genererer nyt unikt coachID
            var idNumber = 1;
            for(i = 0; i< storedUsersList.length; i++) {
                if (storedUsersList[i].coachID >= 0) {
                    idNumber += 1
                }
            }
            //Opretter ny coach og gemmer brugeren i local storage
            userList.push(new Coach(firstName, lastName, username, password, idNumber));
            var newLocalUserListString = JSON.stringify(userList);
            localStorage.setItem("User", newLocalUserListString)
        } else {
            //Genererer nyt unikt studentID
            var idNumber = 1;
            for(i = 0; i< storedUsersList.length; i++) {
                if (storedUsersList[i].studentID >= 0) {
                    idNumber += 1
                }
            }
            //Opretter ny student og gemmer brugeren i local storage
            userList.push(new Student(firstName, lastName, username, password, idNumber));
            var newLocalUserListString = JSON.stringify(userList);
            localStorage.setItem("User", newLocalUserListString)
        }
}
