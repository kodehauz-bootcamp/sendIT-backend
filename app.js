const app = require('./index');

const PORT = parseInt(process.env.PORT, 10) || 5001;

app.listen(PORT, () => {
	console.log(`server started at ${PORT}`);
});
