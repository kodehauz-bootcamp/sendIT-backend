const Admin = require('./../models/admin');
const generateAuthToken = require('./../utils/generateToken');
const { hash, compareHash } = require('./../utils/hash');

module.exports = {
	async CreateAdmin(request, response) {
		const { password, passwordConfirm, username, email } = request.body;

		try {
			const adminCheck = await User.findOne({ email });
			if (adminCheck) {
				throw new Error("message: 'This email is already taken'");
			}

			if (password != passwordConfirm) {
				return response.status(402).send({ message: 'Password is not correctly alligned' });
			}
			const admin = new User({
				username: username,
				email: email,
				password: password
			});
			const token = await generateAuthToken(admin);
			await hash(admin);

			await admin.save();
			response.header('x-auth-token', token).status(201).send({ message: 'Success', admin, token });
		} catch (e) {
			response.status(500).send(e.message);
		}
	},

	async loginAdmin(request, response) {
		try {
			const { email, password } = request.body;

			const admin = await User.findOne({ email });

			if (!admin) {
				throw new Error('You are not Authorised');
			}

			const passwordMatch = await compareHash(password, admin.password);
			// return console.log(passwordMatch)

			if (!passwordMatch) {
				throw new Error('Invalid Password');
			}
			const token = await generateAuthToken(admin);

			response.header('x-auth-token', token).status(201).send({ message: 'Success', admin, token });
		} catch (e) {
			response.status(500).send(e.message);
		}
	},

	async getUser(request, response) {
		response.send(request.admin);
	},

	async userLogout(request, response) {
		// return console.log(userProfile)
		try {
			const userProfile = request.admin;
			userProfile.tokens = [];
			await userProfile.save();
			return response.status(200).send(userProfile);
		} catch (e) {
			response.status(400).send(e.message);
		}
	}
};
