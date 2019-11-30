//Tjekker om mappen "User", i LocalStorage, er tom. Hvis "User" er tom, bliver dummy dataene gemt i mappen.
if (localStorage.getItem("User") == null) {
    //Dummy user data, som bliver pushet til "userList"
    let userList = [];

    userList.push(new Coach("Hussain", "Rafi", "hussain", "rafi123", 1, ["Fodbold 1. hold", "Springgymnastik 3. hold"]));
    userList.push(new Student("Philip", "Burleigh", "philip", "burleigh123", 1, ["Tennis 2. hold", "Springgymnastik 3. hold"]));
    userList.push(new Student("Andreas", "Krogh", "andreas", "krogh123", 2, ["Springgymnastik 3. hold", "Tennis 2. hold", "Fodbold 1. hold"]));
    userList.push(new Student("Caroline", "Lindegren", "caroline", "lindegren123", 3, ["Springgymnastik 3. hold", "Fodbold 1. hold"]));
    userList.push(new Student("Henrik", "Thorn", "henrik", "password", 4, ["Springgymnastik 3. hold", "Tennis 2. hold"]));
    userList.push(new Student("Anders", "Matthesen", "anders", "password", 5, ["Springgymnastik 3. hold", "Fodbold 1. hold"]));
    userList.push(new Student("Frank", "Hvam", "frank", "password", 6, ["Springgymnastik 3. hold", "Tennis 2. hold"]));
    userList.push(new Student("Casper", "Christensen", "casper", "password", 7, ["Springgymnastik 3. hold", "Tennis 2. hold"]));
    //Gemmer til localStorage
    Tools.saveToLocalStorage(userList,"User");
}

//Tjekker om mappen "Sessions", i LocalStorage, er tom. Hvis "Sessions" er tom, bliver dummy dataene gemt i mappen.
if (localStorage.getItem("Sessions") == null) {
    //Tomt array, som alle dummy sessions bliver pushet til
    let sessions = [];
    let userList = Tools.getAllUsers();

    //Dummy session data, som bliver pushet til "sessions"
    sessions.push(new Session("Hussain Rafi","Springgymnastik 3. hold","Springhal", [1577876400000, 1577883599000], [userList[1],userList[2], userList[3], userList[4], userList[5], userList[6], userList[7]]));
    sessions.push(new Session("Hussain Rafi","Springgymnastik 3. hold","Indendørs tennis- og springhal", [1577962800000, 1577969999000], [userList[1],userList[2], userList[3], userList[4], userList[5], userList[6], userList[7]]));
    sessions.push(new Session("Hussain Rafi","Fodbold 1. hold","Indendørs fodbold- og tennisbane", [1578049200000, 1578056399000], [userList[2], userList[3], userList[5]]));

    //Arrayet med dummy sessions gemmes i local storage, med nøglen "Sessions"
    Tools.saveToLocalStorage(sessions,"Sessions");
}

