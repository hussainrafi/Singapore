// User klasse
class User {
    constructor(firstName, lastName, username, password, sportTeams){
         this.firstName = firstName;
         this.lastName = lastName;
         this.username = username;
         this.password = password;
         this.sportTeams = sportTeams;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
//Coach klasse, som er nedarvet fra User
class Coach extends User{
    constructor(firstName, lastName, username, password, coachID, sportTeams){
        super(firstName, lastName, username, password, sportTeams);
        this.coachID = coachID;
    }
}
//Student klasse, som er nedarvet fra User
class Student extends User{
    constructor(firstName, lastName, username, password, studentID, sportTeams){
      super(firstName, lastName, username, password, sportTeams);
      this.studentID = studentID;
    }
}


//Tomt array, som alle brugere bliver pushet til
var userList = [];

//Tjekker om mappen "User", i LocalStorage, er tom. Hvis "User" er tom, bliver dummy dataene gemt i mappen.
if (localStorage.getItem("User") == null) {
    //Dummy user data, som bliver pushet til "userList"
    userList.push(new Coach("Hussain", "Rafi", "hussain", "rafi123", 1, ["fodbold1", "springgymnastik3"]));
    userList.push(new Student("Philip", "Burleigh", "philip", "burleigh123", 1, ["tennis2", "springgymnastik3"]));
    userList.push(new Student("Andreas", "Krogh", "andreas", "krogh123", 2, ["fodbold3", "tennis3"]));
    userList.push(new Student("Caroline", "Lindegren", "caroline", "lindegren123", 3, ["springgymnastik3"]));

    var userListString = JSON.stringify(userList);
    localStorage.setItem("User", userListString);
//Hvis "User" i LocalStorage ikke er tom, hentes dataene fra "User" og gemmes i userList
} else {
    var userList = JSON.parse(localStorage.getItem("User"))
}

