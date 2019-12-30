const jwt = require('jsonwebtoken');
const User = require('./../models/user');

//adding a route middleware
const auth = async (req, res, next) => {
	// let token;
	try {
		//firstly is to get the token given by the user
		const token =
			req.header('Authorization').replace('Bearer ', '') ||
			req.headers['x-access-token'] ||
			res.headers['x-access-token'];
		// return console.log(token);
		//decoding the token to get id and secret value
		if (!token) return res.status(401).send('Access denied. No token provided.');

		const decoded = jwt.verify(token, process.env.SECRET);

		//compare if the decoded value exist in the database and get user
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

		if (!user) {
			throw new Error("Profile dosen't exist");
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401).send(error.message);
	}
};

module.exports = auth;
