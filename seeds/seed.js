// use sequelize to seed database
const sequelize = require('../config/connection');
// require models
const { User, Calendar, Standard, Admin, Class} = require('../models'); //add admin in future, class if needed add back standard if user works

// reference seed files
const userData = require('./userData.json');
const calendarData = require('./calendarData.json'); 
const standardData = require('./standardData.json');
const adminData = require('./userAdminData.json');
const classData = require('./classData.json');

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

  const standard = await Standard.bulkCreate(standardData, {
    returning: true,
  });

  const admin = await Admin.bulkCreate(adminData, {
    returning: true,
  });

  for (const calendar of calendarData) { 
    await Calendar.create({
      ...calendar,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const cls of classData) { 
    await Class.create({
      ...cls,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
