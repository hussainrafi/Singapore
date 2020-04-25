const pool = require('../db');
Skal bruges??
//const bcrypt = require('bcryptjs')


module.exports = {
    async create(req, res) {
        pool.query(`INSERT INTO Session (team, Coach_id, student_id, facility_id, timeInterval ) VALUES
($1, $2, $3, $4) RETURNING *`, [req.body.team, req.body.Coach_id,
            req.body.student_id, req.body.facility_id, req.body.timeInterval]
        ).then(result => {
            console.log(result.rows);
            res.redirect('/')
        })
    },

    async post(req, res) {
        pool.query(`SELECT * FROM Sessions`).then(res => {
            const data = res.rows;
            console.log('all data');
            data.forEach(row => {
                console.log(`Team: ${row.team} : ${row.} Vaelg hold: ${coachid} Vaelg facilitet: ${row.student_id} Vaelg dato: ${row.facility_id} Vaelg starttid: ${row.timeInterval} `);
            })
        })
    }
}
