// create models for User, Standard (if needed, table already contains class data)

const User = require('./User'); 
const Standard = require('./Standard');
const Calendar = require('./Calendar');
const Admin = require('./Admin');
const Class = require('./Class');

User.hasMany(Class, { 
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
 });

/*FUTURE COULD CROSS REFERENCE TABLE - USER_STANDARD */

 User.hasMany(Calendar, {
     foreignKey: 'user_id'
 });

module.exports = { User, Standard, Calendar, Admin, Class}; //add back in standard if user working
