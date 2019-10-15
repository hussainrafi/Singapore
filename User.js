//Klasser
class User {
    constructor(firstName, lastName, username, password, sportLevel, userType){
         this.firstName = firstName;
         this.lastName = lastName;
         this.username = username;
         this.password = password;
         this.sportLevel = sportLevel;
         this.userType = userType;
     }
}

//Dummy data som objekter der bliver pushet til et empty array
var user1 = new User("Hussain", "Rafi", "hussain", "rafi123", "fodbold5", "Admin");
var user2 = new User("Philip", "Burleigh", "philip", "burleigh123", "Rundbold2", "Student");
var user3 = new User("Andreas","Krogh", "andreas","krogh123", "Bowling2", "Admin");
var user4 = new User("Caroline", "Lindegren", "caroline", "lindegren123","Tennis3", "student");

var objPeople = [];
objPeople.push(user1, user2, user3, user4);
console.log(objPeople)


//Funktion til login

function login(){
    //Starter med at hente input fra HTML form
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    //for loop som kører alle user objekter igennem og ser om username og password findes og matcher
    for(i = 0; i< objPeople.length; i++){
        if(username.toLocaleLowerCase().trim() == objPeople[i].username && password == objPeople[i].password){
            console.log(username.trim() + " er logget ind" )
            if (objPeople[i].userType == "Admin"){
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