// User klasse
class User {
    constructor(firstName, lastName, username, password, sportTeams) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.sportTeams = sportTeams;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

}
//Coach klasse, som er nedarvet fra User
class Coach extends User{
    constructor(firstName, lastName, username, password, coachID, sportTeams){
        super(firstName, lastName, username, password, sportTeams);
        this.coachID = coachID;
    }
}
//Student klasse, som er nedarvet fra User
class Student extends User{
    constructor(firstName, lastName, username, password, studentID, sportTeams){
      super(firstName, lastName, username, password, sportTeams);
      this.studentID = studentID;
    }
}