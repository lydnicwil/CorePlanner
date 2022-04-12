// create models for User, Standard (if needed, table already contains class data)

const User = require('./User'); 
const Standard = require('./Standard');
const Calendar = require('./Calendar');

/* User.hasMany(Standard, {  //relationship user has many standards (user)
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
 }); */

 User.hasMany(Calendar, {
     foreignKey: 'user_id'
 });

module.exports = { User, Standard, Calendar}; //add back in standard if user working
