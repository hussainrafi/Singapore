const pool = require('./Database/db');
pool.query(`
/* Inserting Sessions into Session Table */
INSERT INTO Session (team, Coach_id, student_id, facility_id, timeInterval)
VALUES
('Barcelona', '303011', '563212', '093434', '15:00 - 18:00'),
    ('Real Madrid', '303012', '563213' '093435', '18:00 - 22:00'),
    ('Atletico Madrid', '303013', '563214', '093436', '12:00 - 11:00'),
    ('Sevilla', '303014', '563215', '093437', '08:00 - 10:00'),
    ('Marseille', '303015', '563216', '093438', '09:00 - 11:00'); 
    
`).then(result => {
    console.log(error, result);
});



