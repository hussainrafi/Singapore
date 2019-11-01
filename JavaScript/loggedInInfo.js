var brugerInfo = JSON.parse(localStorage.getItem("loggedIn"));
var firstName = brugerInfo.firstName;
var lastName = brugerInfo.lastName;
var username = brugerInfo.username;
var password = brugerInfo.password;

document.getElementById("firstName").innerHTML = firstName;
document.getElementById("lastName").innerHTML = lastName;
document.getElementById("username").innerHTML = username;
document.getElementById("password").innerHTML = password;