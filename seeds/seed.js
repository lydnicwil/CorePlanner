const sequelize = require('../config/connection');
const { User, Standard, Class } = require('../models'); //add admin in future

const userData = require('./userData.json');
const projectData = require('./projectData.json'); //update to standardsData

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {    //update to standardsData
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
