const welcomeMessage = (request, response) => {
	response.status(200).send('Welcome to sendIT-backend');
};

module.exports = welcomeMessage;
