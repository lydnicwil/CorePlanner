// use sequelize to seed database
const sequelize = require('../config/connection');
// require models
const { User, Standard, Calendar} = require('../models'); //add admin in future, class if needed

// reference seed files
const userData = require('./userData.json');
const standardData = require('./standardData.json'); 
const calendarData = require('./calendar.json');
// const userAdminData = require('./userAdminData.json'); bonus

// seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // user seeds require hooks for validation of user data
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SYNCED -----\n');

  for (const standard of standardData) { 
    await Standard.create({
      ...standard,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const cal of calendarData) {
    await Calendar.create({
      ...cal,
      teacher_id: teacher[Math.floor(Math.random() * teacher.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
