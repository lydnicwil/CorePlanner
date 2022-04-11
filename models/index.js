// create models for User, Standard (if needed, table already contains class data)

const User = require('./User'); 
// const Standard = require('./Project');

// User.hasMany(Standard, {  //relationship user has many standards (user)
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

module.exports = { User}; //add back in standard if user working
