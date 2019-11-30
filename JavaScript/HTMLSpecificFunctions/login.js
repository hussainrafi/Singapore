function login() {
    //Henter input fra HTML form
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //Henter alle brugere
    let userList = Tools.getAllUsers();

    //for loop som kører alle user objekter igennem og ser om username og password findes og matcher
    for (let i = 0; i < userList.length; i++) {
        if (username.toLowerCase().trim() == userList[i].username && password == userList[i].password) {
            if (userList[i].coachID > 0) {
                window.location.replace("adminHjem.html");
                let logOn = JSON.stringify(userList[i]);
                localStorage.setItem("loggedIn", logOn);

            } else {
                window.location.replace("studentHjem.html");
                let logOn = JSON.stringify(userList[i]);
                localStorage.setItem("loggedIn", logOn);
            }
            return
        }
    }
    //Fejlbesked hvis username og password ikke matcher
    alert("Brugernavn eller adgangskode findes ikke");
}