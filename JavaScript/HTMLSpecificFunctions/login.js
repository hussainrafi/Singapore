function login() {
    //Henter input fra HTML form og gemmer dem i variabler
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //Henter alle brugere
    let userList = Tools.getAllUsers();

    //Tjekker om der er en bruger bag det indtastede brugernavn og password
    //Looper igennem alle brugere
    for (let i = 0; i < userList.length; i++) {
        //Går ind i if-statement hvis den aktuelle bruger har det samme brugernavn og password,
        //som det brugernavn og password der er gemt i variablerne
        if (username.toLowerCase().trim() == userList[i].username && password == userList[i].password) {

            //Logger træner ind ind:
            //Går ind i if-statement hvis det aktuelle bruger-objekt har et coachID som property
            if (userList[i].hasOwnProperty("coachID")) {
                //Sender brugeren videre til "adminHjem.html"
                window.location.replace("adminHjem.html");

            //Logger elev ind:
            //Går ind i else-statement
            } else {
                //Sender brugeren videre til "studentHjem.html"
                window.location.replace("studentHjem.html");

            }
            //Gemmer objektet for den bruger der er logget ind i localStorage, med nøglen "loggenIn"
            Tools.saveToLocalStorage(userList[i], "loggedIn");
            return
        }
    }
    //Fejlbesked hvis username og password ikke matcher
    alert("Brugernavn eller adgangskode findes ikke");
}