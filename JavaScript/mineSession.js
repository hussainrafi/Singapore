
function mineSessions() {
    var user = JSON.parse(localStorage.getItem("loggedIn"));
    var userSessions = [];

    for (i = 0; i < sessions.length; i++) {
        let currentSession = sessions[i].students;
        for (j = 0; j < currentSession.length; j++){
            if(currentSession[j].studentID == user.studentID){
                userSessions.push(sessions[i])
            }
        }
    }
    console.log(userSessions)
}

