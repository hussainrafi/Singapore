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

class Coach extends User{
    constructor(firstName, lastName, username, password, coachID){
        super(firstName, lastName, username, password);
        this.coachID = coachID;
    }
}

class Student extends User{
    constructor(firstName, lastName, username, password, studentID){
      super(firstName, lastName, username, password);
      this.studentID = studentID;
    }
}

//Liste der opbevarer brugerne
var userList = [];
    //Dummy user data, som objekter der bliver pushet til et empty array
    userList.push(new Coach("Hussain", "Rafi", "hussain", "rafi123", 1));
    userList.push(new Student("Philip", "Burleigh", "philip", "burleigh123", 1));
    userList.push(new Student("Andreas","Krogh", "andreas","krogh123", 2));
    userList.push(new Student("Caroline", "Lindegren", "caroline", "lindegren123", 3));

var userListString = JSON.stringify(userList);
localStorage.setItem("User", userListString)

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
    //Brugertype (Coach eller Student)
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

    var firstName = document.getElementById('newFirstName').value;
    var lastName = document.getElementById('newLastName').value;
    var username = document.getElementById('newUsername').value;
    var password = document.getElementById('newPassword').value;

    var storedUsersList = JSON.parse(localStorage.getItem("User"));

    if(userType == "Coach"){
        var idNumber = 1;
        for(i = 0; i< storedUsersList.length; i++) {
            if (storedUsersList[i].coachID >= 0) {
                idNumber += 1
            }
        }
        userList.push(new Coach(firstName, lastName, username, password, idNumber));
        var newLocalUserListString = JSON.stringify(userList);
        localStorage.setItem("User", newLocalUserListString)
    } else {
        return
    }
};