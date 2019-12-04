const User = require('./../models/user');
const generateAuthToken = require('./../utils/generateToken');
const hash = require('./../utils/hash')

module.exports = {

  async CreateUser(request, response) {

    try {
      const user = new User(request.body);
      const token = await generateAuthToken(user);
      await hash(user);

      await user.save();
      response.status(200).send({ message: "Success", user, token})
    } catch (e) {
      response.status(500).send(e.message)
    }
  }

};