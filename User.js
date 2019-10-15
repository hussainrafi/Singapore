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

var user1 = new User("Hussain", "Rafi", "hussain", 1234, "fodbold5", "Admin");
var user2 = new User("Peter", "Petersen", "peter123", 4321, "Rundbold2", "Student");

var objPeople = []
objPeople.push(user1, user2)
console.log(objPeople)

//Dummy data for users som bliver defineret i en array

/*var objPeople = [
    {
        username: "hussain",
        password: "rafi123",
        sportLevel: "Fodbold5",
        userType: "Administrator"
    },
    {
        username: "philip",
        password: "burleigh123",
        sportLevel: "Rundbold2",
        userType: "Student"
    },
    {
        username: "andreas",
        password: "krogh123",
        sportLevel: "Bowling2",
        userType: "Student"
    },
    {
        username: "caroline",
        password: "lindegren123",
        sportLevel: "Tennis3",
        userType: "Student"
    }
]*/

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
    console.log("Brugernavn eller adgangskode findes ikke")
}