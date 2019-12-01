function newSession() {
    //Tom variabel som bliver lig med den sport, som er blevet valgt
    let currentTeam = document.getElementById("sportLevel").value;

    //Tjekker hvilke sportsgrene der er checket af, og pusher dem til sportLevels
    /*var sportLevel = document.getElementsByClassName("sportLevel");
    for (i=0; i<sportLevel.length; i++) {
        if (sportLevel[i].checked) {
            currentTeam = sportLevel[i].value
        }
    }*/

    //Tom variabel som bliver lig med et facilityId
    let pickedFacility = document.getElementById("facilityType").value;

    //Gemmer den valgte facility i "pickedFacility"
    /*var facilityButtons = document.getElementsByClassName("facilityType");
    for (i=0; i<facilityButtons.length; i++) {
        if (facilityButtons[i].checked) {
            pickedFacility = facilityButtons[i].value
        }
    }*/

    //Henter tidsinfo om sessionen, og gemmer em i variabler
    let bookingYear = document.getElementById("sessionYear").value;
    let bookingMonth = document.getElementById("sessionMonth").value;
    let bookingDay = document.getElementById("sessionDay").value;
    let bookingHour = document.getElementById("sessionHour").value;
    let bookingMinute = document.getElementById("sessionMinute").value;
    let durationHours = document.getElementById("durationHours").value;
    let durationMinute = document.getElementById("durationMinute").value;

    //Array med alle de udfyldte informationer
    let typedData = [currentTeam, pickedFacility, bookingYear, bookingMonth, bookingDay, bookingHour, bookingMinute, durationHours, durationMinute];

    //Checker om alle tidsinformationerne er udfyldt
    for (let i = 0; i < typedData.length; i++) {
        if (typedData[i] == "notDefined") {
            alert("Alle felter felter skal udfyldes");
            return;
        }
    }

    let facilities = Tools.getAllFacilities();

    //Tom variabel som bliver lig med objektet for den valgte facility
    let currentFacility = null;
    for (let i = 0; i < facilities.length; i++) {
        if (pickedFacility == facilities[i].facilityId) {
            currentFacility = facilities[i]
        }
    }

    //Henter den træner der er logget ind
    let coach = Tools.getCurrentUser();

    //Boolean som bliver "true"
    let sportsMatchCoach = false;

    //Tjekker om træneren underviser den sportsgren, som der er blevet krydset af.
    //Hvis det matcher bliver "sportsMatchCoach = true"
    for (let i = 0; i < coach.sportTeams.length; i++) {
        if (coach.sportTeams[i] == currentTeam) {
            sportsMatchCoach = true;
        }
    }

    //Hvis "sportsMatchCoach" forbliver "false", udløses alerten "Du underviser ikke dette hold"
    if (sportsMatchCoach == false) {
        alert("Du underviser ikke dette hold");
        return;
    }

    //Boolean som forbliver "false", medmindre at den valgte facility er egnet til den valgte sport
    let sportsMatchFacility = false;

    let currentFacilitySports = currentFacility.suitableSports;
    for (let i = 0; i < currentFacilitySports.length; i++) {
        if (currentFacilitySports[i] == currentTeam) {
            sportsMatchFacility = true
        }
    }

    //Hvis "sportsMatchFacility" forbliver "false", udløses alerten "Du underviser ikke dette hold"
    if (sportsMatchFacility == false) {
        alert(`Den valgte facilitet egner sig ikke til den valgte sport.`);
        return;
    }


    //Gemmer tidskoden for starten af sessionen som millisekunder
    let startTimecode = Tools.getTimeCode(bookingYear, bookingMonth, bookingDay, bookingHour, bookingMinute);

    //Opretter tidkoden for det seneste tidspunkt, som sessionen må slutte
    let latestTimecode = Tools.getTimeCode(bookingYear, bookingMonth, bookingDay, 22, 0);

    //Gemmer tidskoden for sessionsvarigheden som millisekunder
    let durationTimecode = Tools.getTimeCode(1970, 0, 1, durationHours, durationMinute - 1, 59);

    //Gemmer tidskoden for slutningen af sessionen som millisekunder
    let endTimecode = startTimecode + durationTimecode;

    //Tomt array hvor sessioner med den valgte facility bliver gemt
    let sessionsInCurrentFacility = [];

    let sessions = Tools.getAllSessions();

    //Pusher session til "sessionsInCurrentFacility", hvis sessionen bliver afholdt i den valgte facility
    for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].facility == currentFacility.facilityId) {
            sessionsInCurrentFacility.push(sessions[i])
        }
    }

    //Checker om sluttidspunktet er efter lukketid
    if (endTimecode > latestTimecode) {
        alert("Sluttidspunktet er efter lukketiden 22.00.");
        return;
    }

    //Checker om tidsintervallet overlapper med andre sessioner i samme facility
    for (let i = 0; i < sessionsInCurrentFacility.length; i++) {
        let currentInterval = sessionsInCurrentFacility[i].timeInterval;
        if (currentInterval[0] <= startTimecode && startTimecode <= currentInterval[1]
            || currentInterval[0] <= endTimecode && endTimecode <= currentInterval[1]) {
            alert("Overlappende sessioner");
            return;
        }
    }

    //Gemmer tidsintervallet i et array
    let timeInterval = [startTimecode, endTimecode];


    //Tomt array til de brugere der er er tilmeldt det valgte hold
    let currentUsers = Tools.getStudentsFromTeam(currentTeam);

    Tools.sessionBuilder(coach.getFullName(), currentTeam, currentFacility, timeInterval, currentUsers)
}
