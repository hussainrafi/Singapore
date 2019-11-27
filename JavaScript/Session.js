//Session klasse
class Session {
    constructor(coach, team, facility, timeInterval, students){
        this.coach = coach;
        this.team = team;
        this.facility = facility;
        this.timeInterval = timeInterval;
        this.students = students;
    }
}

//Tomt array, som alle sessions bliver pushet til
var sessions = [];

//Tjekker om mappen "Sessions", i LocalStorage, er tom. Hvis "Sessions" er tom, bliver dummy dataene gemt i mappen.
if (localStorage.getItem("Sessions") == null) {
    //Dummy session data, som bliver pushet til "sessions"
    //sessions.push(new Session("Hussain",[userList[1],userList[3]], "springgymnastik3"))

    Tools.saveToLocalStorage("Sessions")
} else {
    sessions = Tools.getFromLocalStorage("Sessions")
}