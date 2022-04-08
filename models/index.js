// create models for User, Standard, Class

const User = require('./User'); 
const Standard = require('./Standard'); //this will be standards
const Class = require('./Class'); //this will be classes if multiple tables 

User.hasMany(Class, {  //user has many Classes (user)
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Class.belongsToMany(User, {  //many classes can have many teachers (many-to-many)
  foreignKey: 'user_id'
});

Standard.belongsTo(Class, {  //standards can (many-to-one)
  foreignKey: 'user_id'
});

module.exports = { User, Class, Standard };
