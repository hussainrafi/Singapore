
module.exports = (sequelize, Sequelize) => {
    const Coach = sequelize.define('Coach', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
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
    return Coach
};