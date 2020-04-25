const Sequelize = require('models/sequelize')
const CoachModel = require('./coach')
const StudentModel = require('./student')


const sequelize = new Sequelize('codementor', 'root', 'root', {
    host: 'localhost',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
sequelize.sync({ force: true })
    .then(() => {
        console.log('Sucesffully created database!')
    })


const Coach = CoachModel(sequelize, Sequelize)
const Student = StudentModel(sequelize, Sequelize)
module.exports = {
    Coach,
    Student
}