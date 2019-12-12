const transporter = require('./nodemailer');
// const process.env = require('./../../config/process.env');

const SendContactMessage = (details) => {
	const { email, subject, content } = details;
	// return console.log(email, subject, content);

	const mailOptions = {
		from: `${email}`,
		to: `${process.env.EMAIL_ID}`,
		subject: `${subject}`,
		text: `${content}`
	};
	// return console.log(mailOptions);
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error occurred. ' + error.message);
			// return process.exit(1);
		} else {
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		}
	});
};

const sendProcessingNotification = (email) => {
	const mailOptions = {
		from: `${process.env.EMAIL_ID}`,
		to: `${email}`,
		subject: `${subject}`,
		text: ``
	};
	// return console.log(mailOptions);
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error occurred. ' + error.message);
			// return process.exit(1);
		} else {
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		}
	});
};

const sendDeliveredNotification = (email) => {
	const mailOptions = {
		from: `${email}`,
		to: `${process.env.EMAIL_ID}`,
		subject: `${subject}`,
		text: ``
	};
	// return console.log(mailOptions);
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error occurred. ' + error.message);
			// return process.exit(1);
		} else {
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		}
	});
};

module.exports = {
	SendContactMessage,
	sendProcessingNotification,
	sendDeliveredNotification
};
