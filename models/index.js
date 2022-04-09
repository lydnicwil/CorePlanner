// create models for User, Standard, Class (if needed, table already contains class data)

const User = require('./User'); 
const Standard = require('./Standard');

User.hasMany(Standard, {  //relationship user has many standards (user)
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Standard };
