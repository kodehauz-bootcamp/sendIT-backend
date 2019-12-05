const jwt = require('jsonwebtoken');
const User = require('./../models/user');

// let userProfile, userToken;

//adding a route middleware
const auth = async (req, res, next) => {
	try {
		//firstly is to get the token given by the user
		const token = req.header('Authorization').replace('Bearer ', '');
		//    return console.log(token)
		//decoding the token to get id and secret value
		const decoded = jwt.verify(token, process.env.SECRET);
		//    return console.log(decoded)
		//compare if the decoded value exist in the database and get user
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

		if (!user) {
			throw new Error("Profile dosen't exist");
		}
		// //    return console.log(user, token )
		//     userProfile = user;
		//     userToken = token;
		//     // return console.log(userProfile);
		//     return next()
		req.user = user;
		next();
	} catch (error) {
		res.status(401).send(error.message);
	}
};

module.exports = auth;
