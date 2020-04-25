
module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('Student', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        sportsTeam: {
            type: Sequelize.STRING
        }
    });
    return Student
};

