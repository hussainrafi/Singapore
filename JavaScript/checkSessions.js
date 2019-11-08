
function checkSessions() {
    var user = JSON.parse(localStorage.getItem("loggedIn"));
    var userSessions = [];

    for (i = 0; i < sessions.length; i++) {
        let currentSession = sessions[i].students;
        for (j = 0; j < currentSession.length; j++) {
            if (currentSession[j].studentID == user.studentID) {
                sessions[i].Træner = sessions[i].coach;
                delete sessions[i].coach;
                sessions[i].Hold = sessions[i].team;
                delete sessions[i].team;
                sessions[i].Facilitet = sessions[i].facility;
                delete sessions[i].facility;
                sessions[i].Mødetid = sessions[i].timeInterval;
                delete sessions[i].timeInterval;
                delete sessions[i].students;
                userSessions.push(sessions[i])
            }
        }
    }

    //Laver tabel
    let table = document.createElement("table");

    //Finder overskrifter til tabellen og gemmer den i fields
    let fields = Object.keys(userSessions[0]);
    let headRow = document.createElement("tr");

    fields.forEach(function(field) {
        let headCell = document.createElement("th");
        headCell.appendChild(document.createTextNode(field));
        headRow.appendChild(headCell);
    });
    table.appendChild(headRow);

    //Laver tabel rækker
    userSessions.forEach(function(object) {
        let row = document.createElement("tr");
        fields.forEach(function(field) {
            let cell = document.createElement("td");
            cell.appendChild(document.createTextNode(object[field]));
            if (typeof object[field] == "number") {
                cell.style.textAlign = "right";
            }
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    return table;
}



