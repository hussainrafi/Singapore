//Funktion til login
class Tools {

    static getFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }

    static saveToLocalStorage(data, key){
        let stringifiedData = JSON.stringify(data);
        localStorage.setItem(key, stringifiedData);

    }

    static getCurrentUser(){
       let currentUser = JSON.parse(localStorage.getItem("loggedIn"));
       if(currentUser.hasOwnProperty("studentID")){
           return new Student(currentUser.firstName, currentUser.lastName, currentUser.username, currentUser.password, currentUser.studentID, currentUser.sportTeams);
       }
       else {
           return new Coach(currentUser.firstName, currentUser.lastName, currentUser.username, currentUser.password, currentUser.coachID, currentUser.sportTeams);
       }

    }

    static getTimeCode(year, month, date, hours, minutes = null, seconds = null){
        let newDate = new Date(year, month, date, hours, minutes, seconds);
        let timecode = newDate.getTime();
        return timecode;
    }
}

