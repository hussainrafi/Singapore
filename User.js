// User klasse
class User {
    constructor(firstName, lastName, username, password, sportLevel){
         this.firstName = firstName;
         this.lastName = lastName;
         this.username = username;
         this.password = password;
         this.sportLevel = sportLevel;
     }
}

class Coach extends User{
    constructor(firstName, lastName, username, password, sportLevel, coachID){
        super(firstName, lastName, username, password, sportLevel);
        this.coachID = coachID;
    }
};

class Student extends User{
    constructor(firstName, lastName, username, password, sportLevel, studentID){
      super(firstName, lastName, username, password, sportLevel);
      this.studentID = studentID;
    }
};


//Dummy user data, som objekter der bliver pushet til et empty array
var user1 = new Coach("Hussain", "Rafi", "hussain", "rafi123", "Fodbold", 1);
var user2 = new Student("Philip", "Burleigh", "philip", "burleigh123", "Rundbold", 1);
var user3 = new Student("Andreas","Krogh", "andreas","krogh123", "Bowling", 2);
var user4 = new Student("Caroline", "Lindegren", "caroline", "lindegren123","Tennis", 3);

var users = [];
users.push(user1, user2, user3, user4);

//Funktion til login
function login(){
    //Starter med at hente input fra HTML form
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    //for loop som kører alle user objekter igennem og ser om username og password findes og matcher
    for(i = 0; i< users.length; i++){
        if(username.toLocaleLowerCase().trim() == users[i].username && password == users[i].password){
            console.log(username.trim() + " er logget ind" )
            if (users[i].coachID > 0){
                window.location.replace("AdminIndex.html");
            } else {
                    window.location.replace("StudentIndex.html");
                 }
        return
        }
    }
    //Fejlbesked hvis username og password ikke matcher
    alert("Brugernavn eller adgangskode findes ikke");
}