// create models for User, Standard, Class (if needed, table already contains class data)

const User = require('./User'); 
const Standard = require('./Standard');
const Calendar = require('./Calendar');

User.hasMany(Standard, {  //relationship user has many standards (user)
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasOne(Calendar, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Calendar.belongsTo(User,{
    foreignKey: 'user_id'
  });

module.exports = { User, Standard, Calendar };
