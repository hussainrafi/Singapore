//Session klasse
class Session {
    constructor(coach, students, facility){
        this.coach = coach;
        this.students = students;
        this.facility = facility;
    }
}

//Tomt array, som alle sessions bliver pushet til
var sessions = [];

//Tjekker om mappen "Sessions", i LocalStorage, er tom. Hvis "Sessions" er tom, bliver dummy dataene gemt i mappen.
if (localStorage.getItem("Sessions") == null) {
    //Dummy session data, som bliver pushet til "sessions"
    sessions.push(new Session("Hussain",[userList[1],userList[3]], "springgymnastik3"))

    var sessionsString = JSON.stringify(sessions);
    localStorage.setItem("Sessions", sessionsString);
} else {
    var sessions = JSON.parse(localStorage.getItem("Sessions"))
}