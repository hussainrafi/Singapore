//Klasser
class user {
    /* constructor(firstName, lastName, username, password, sportLevel){
         this.firstName = firstName;
         this.lastName = lastName;
         this.username = username;
         this.password = password;
         this.sportLevel = sportLevel;
     }*/
}
//user1 = new user(Hussain, Rafi, hussain, 1234, fodbold5);
//user2 = new user(Peter, Petersen, peter123, 4321, Rundbold2);


//Dummy data for users som bliver defineret i en array

var objPeople = [
    {
        username: "hussain",
        password: "rafi123",
        sportLevel: "Fodbold5"
    },
    {
        username: "phillip",
        password: "burleigh123",
        sportLevel: "Rundbold2"
    },
    {
        username: "andreas",
        password: "krogh123",
        sportLevel: "Bowling2"
    },
    {
        username: "caroline",
        password: "lindegren123",
        sportLevel: "Tennis3"
    }
]

//Funktion til login

function login(){
    //Starter med at hente input fra HTML form
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    //for loop som køre alle user objekter igennem og ser om username og password findes og matcher
    for(i = 0; i< objPeople.length; i++){
        if(username == objPeople[i].username && password == objPeople[i].password){
            console.log(username + " er logget ind" )
            return
        }
    }
    //Fejlbesked hvis username og password ikke matcher
    console.log("Brugernavn eller adgangskode findes ikke")
}
