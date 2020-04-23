const pool = require('./Database/db');
pool.query(`
CREATE TABLE Coach (
coachid SERIAL PRIMARY KEY
username text NOT NULL,
password text NOT NULL,
firstName text NOT NULL,
lastName text NOT NULL,
sportsTeam text NOT NULL);

CREATE TABLE Student (
studentid SERIAL PRIMARY KEY
userName text NOT NULL,
password text NOT NULL,
firstname text NOT NULL,
lastName text NOT NULL),
sportsTeam text NOT NULL);

CREATE TABLE Session (
team text NOT NULL,
coachid INT REFERENCES Coach (id));
student_id INT REFERENCES Student(id));
facility_id INT REFERENCES Facility (id)); 
timeInterval text NOT NULL);

CREATE TABLE Facility (
facilityID SERIAL PRIMARY KEY
capacity text NOT NULL,
suitable text NOT NULL);
`).then(result => {
    console.log(error, result);
});
