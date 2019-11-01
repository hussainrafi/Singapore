//newSession funktion
function newSession() {
    //Henter den træner der er logget ind
    var coach = JSON.parse(localStorage.getItem("loggedIn"));

    var coachSports = [];

    for (i=0; i < coach.sportTeams.length; i++) {
        coachSports.push(coach.sportTeams[i])
    }

    var users = [];

    //Looper igennem alle brugerne og pusher alle student til "users"
    for (i=0; i<userList.length; i++) {
        if (userList[i].studentID >= 0) {
            users.push(userList[i])
        }
    }

    //Tom variabel som bliver lig med den valgte sport
    var currentSport = document.getElementById("sportLevel").value;

    //Tjekker hvilke sportsgrene der er checket af, og pusher dem til sportLevels
    /*var sportLevel = document.getElementsByClassName("sportLevel");
    for (i=0; i<sportLevel.length; i++) {
        if (sportLevel[i].checked) {
            currentSport = sportLevel[i].value
        }
    }*/

    //Boolean som bliver "true"
    var sportsMatchCoach = false;

    //Tjekker om træneren underviser den sportsgren, som der er blevet krydset af.
    //Hvis det matcher bliver "sportsMatchCoach = true"
    for (i=0; i<coachSports.length; i++) {
        if (coachSports[i]==currentSport) {
            sportsMatchCoach = true
        }
    }

    //Hvis "sportsMatchCoach" forbliver "false", udløses alerten "Du underviser ikke dette hold"
    if (sportsMatchCoach == false){
        alert("Du underviser ikke dette hold");
        return;
    }

    //Tomt array til de brugere der er er tilmeldt det valgte hold
    var currentUsers = [];

    //Pusher du brugere, som går på det valgte hold, til "currentUsers"
    if (sportsMatchCoach){
        for (i=0; i<users.length; i++){
            var currentUserSports = users[i].sportTeams;
            for (j=0; j<currentUserSports.length; j++){
                if (currentUserSports[j]==currentSport){
                    currentUsers.push(users[i])
                }
            }
        }
    }

    //Tom variabel som bliver lig med et facilityId
    var pickedFacility = document.getElementById("facilityType").value;

    //Gemmer den valgte facility i "pickedFacility"
    /*var facilityButtons = document.getElementsByClassName("facilityType");
    for (i=0; i<facilityButtons.length; i++) {
        if (facilityButtons[i].checked) {
            pickedFacility = facilityButtons[i].value
        }
    }*/

    //Tom variabel som bliver lig med objektet for den valgte facility
    var currentFacility = "";

    for (i=0; i<facilities.length; i++){
        if (pickedFacility == facilities[i].facilityId){
            currentFacility = (facilities[i])
        }
    }

    //Tjekker om der er plads i lokalet til det valgte antal elever
    if (currentFacility.capacity < currentUsers.length){
        alert(`Pladsmangel! Antal elever: ${currentUsers.length}. Makskapacitet på valgte hal: ${currentFacility.capacity}`);
        return;
    }
    //Boolean som forbliver "false", medmindre at den valgte facility er egnet til den valgte sport
    var sportsMatchFacility = false;

    var currentFacilitySports = currentFacility.suitableSports;
    for (i=0; i<currentFacilitySports.length; i++){
        if (currentFacilitySports[i]==currentSport){
            sportsMatchFacility = true
        }
    }

    //Hvis "sportsMatchFacility" forbliver "false", udløses alerten "Du underviser ikke dette hold"
    if (sportsMatchFacility == false){
        var slicedSport = currentSport.slice(0, -1);
        alert(`Denne hal egner sig ikke til ${slicedSport}.`);
        return;
    }

    //Henter info om sessionsstart
    var bookingYear = document.getElementById("sessionYear").value;
    var bookingMonth = document.getElementById("sessionMonth").value;
    var bookingDay = document.getElementById("sessionDay").value;
    var bookingHour = document.getElementById("sessionHour").value;
    var bookingMinute = document.getElementById("sessionMinute").value;

    //Gemmer tidskoden for starten af session som millisekunder
    var startDate = new Date(bookingYear,bookingMonth,bookingDay,bookingHour,bookingMinute);
    var startTimecode = startDate.getTime();

    //Henter info om sessionsvarighed
    var durationHours = document.getElementById("durationHours").value;
    var durationMinute = document.getElementById("durationMinute").value;

    //Gemmer tidskoden for sessionsvarigheden som millisekunder
    var newDuration = new Date(1970,0,1,durationHours,durationMinute-1, 59);
    var durationTimecode = newDuration.getTime();

    //Gemmer tidskoden for slutningen af sessionen som millisekunder
    var endTimecode = startTimecode + durationTimecode;

    //Tomt array hvor sessioner med den valgte facility bliver gemt
    var sessionsCurrentFacility = [];

    //Pusher session til "sessionsCurrentFacility", hvis sessionen bliver afholdt i den valgte facility
    for (i=0; i<sessions.length; i++){
        if (sessions[i].facility == currentFacility.facilityId){
            sessionsCurrentFacility.push(sessions[i])
        }
    }

    //Checker om tidsintervallet overlapper med andre sessioner i samme facility
    for (i=0; i<sessionsCurrentFacility.length; i++){
        var currentInterval = sessionsCurrentFacility[i].timeInterval;
        if (currentInterval[0] <= startTimecode && startTimecode <= currentInterval[1]
            || currentInterval[0] <= endTimecode && endTimecode <= currentInterval[1]){
            alert("Overlappende sessioner");
            return;
        }
    }

    //Gemmer tidsintervallet i et array
    var timeInterval = [startTimecode, endTimecode];

    //Opretter en ny session og gemmer den i localStorage under "Sessions"
    sessions.push(new Session(coach.username, currentUsers, currentSport, currentFacility.facilityId, timeInterval));
    var newSessionsString = JSON.stringify(sessions);
    localStorage.setItem("Sessions", newSessionsString);
    //Alerter "Ny session oprettet!", når en ny session er blevet oprettet
    alert("Ny session oprettet!");
}