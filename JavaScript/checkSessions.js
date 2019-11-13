
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

    //Sorterer sessionerne efter dato
    for (i=1; i < userSessions.length; i++) {
        for (j = 1; j < userSessions.length; j++) {
            let session = userSessions[j];
            let pastSession = userSessions[j - 1];
            if (session.Mødetid[0] < pastSession.Mødetid[0]) {
                userSessions[j - 1] = session;
                userSessions[j] = pastSession;
            }
        }
    }

    for (i=0; i < userSessions.length; i++) {
        let currentSession = userSessions[i].Mødetid;
        let startDate = new Date (currentSession[0]);
        let endDate = new Date (currentSession[1]+1000);
        let year = startDate.getFullYear();
        let month = startDate.getMonth()+1;
        let date = startDate.getDate();
        let startTime = startDate.toLocaleTimeString();
        let endTime = endDate.toLocaleTimeString();
        userSessions[i].Mødetid = `${date}/${month}/${year} fra ${startTime.slice(0,5)} til ${endTime.slice(0,5)}`;
    }



    //Der oprettes en nyt HTML element med DOM metoden .createElement
    //Det nye HTML element bestemmes til at være en tabel, ved brug af HTML tagget "table"
    //Den nye tabel gemmes i JS variablen "table"
    let table = document.createElement("table");

    //Bruger metoden Object.keys(), som tager et objekt, og returnerer de properties objektet indeholder,
    //som et array, med en string per property, som indeholder property navnet.
    //Her returnerer metoden et array, med de properties for det objekt, som er gemt i arrayet userSessions, med index nummer 0
    //Dette array gemmes i JS variablen "fields".
    let fields = Object.keys(userSessions[0]);

    //Der oprettes en nyt HTML element med DOM metoden .createElement
    //Det nye HTML element bestemmes til at være en tabelrække, ved brug af HTML tagget "tr"
    //Den nye tabelrække gemmes i JS variablen "headRow"
    let headRow = document.createElement("tr");

    //Bruger Higher Order funktionen .forEach(), som tager et array og looper igennem alle index'ne
    //For hver værdi i arrayet executes en funktion, der tager værdien som argument.
    //I dette tilfælde looper den igennem alle værdierne i arrayet "fields og executer en funktion med den aktuelle værdi som argument"
    fields.forEach(function(field) {

        //Der oprettes en nyt HTML element med DOM metoden .createElement
        //Det nye HTML element bestemmes til at være en tabeloverskrift, ved brug af HTML tagget "th"
        //Den nye tabel gemmes i JS variablen "headCell"
        let headCell = document.createElement("th");

        //Ved brug af DOM metoden .createTextNode(), omdannes den string, som "field" repræsenterer, til en node
        //"field" skal omdannes til en node, da noden bruges som parameter i .appendChild()
        //.appendChild() metoden tager en node (her "field") og sætter det til at være lig med værdien,
        //for det valgte HTML element (her "headCell)
        headCell.appendChild(document.createTextNode(field));

        //.appendChild() bruges igen, for at tilføje tabelOverskriften "headCell" til tabelrækken "headRow"
        headRow.appendChild(headCell);
    });
    //.appendChild() bruges igen, for at tilføje tabelrækken "headRow" til tabellen "table"
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



