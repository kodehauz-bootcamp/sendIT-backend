const bcrypt = require('bcryptjs')

const hash = async function (user) {
  user.password = await bcrypt.hash(user.password, 8);
  
  await user.save();
}

module.exports = hash;