// use sequelize to seed database
const sequelize = require('../config/connection');
// require models
const { User, Standard} = require('../models'); //add admin in future, class if needed

// reference seed files
const userData = require('./userData.json');
const standardData = require('./standardData.json'); 
// const userAdminData = require('./userAdminData.json'); bonus

// seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedStandard();
  console.log('\n----- STANDARDS SEEDED -----\n');

  // user seeds require hooks for validation
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

// right now we're not allowing users to create standards
  // for (const project of projectData) { //update to standardsData if allow creation
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
