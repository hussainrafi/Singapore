//Funktion til login
function login(){
    //Starter med at hente input fra HTML form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //for loop som kører alle user objekter igennem og ser om username og password findes og matcher
    for(i=0; i<userList.length; i++){
        if(username.toLowerCase().trim() == userList[i].username && password == userList[i].password){
            if (userList[i].coachID > 0){
                window.location.replace("AdminIndex.html");
                var logOn = JSON.stringify(userList[i]);
                localStorage.setItem("loggedIn", logOn);

            } else {
                window.location.replace("StudentIndex.html");
                var logOn = JSON.stringify(userList[i]);
                localStorage.setItem("loggedIn", logOn);
            }
            return
        }
    };
    //Fejlbesked hvis username og password ikke matcher
    alert("Brugernavn eller adgangskode findes ikke");
}