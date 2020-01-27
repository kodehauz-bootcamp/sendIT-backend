const turf = require('@turf/turf');
// const getCord = require('turf-point');

//calculating distance between cordinates

const generateDistance = async (laitude, longitude) => {
	try {
		const location = turf.point(laitude);
		const destination = turf.point(longitude);
		// return console.log(location, destination);
		const options = { units: 'kilometers' };

		const distance = await turf.distance(location, destination, options);
		return distance;
	} catch (error) {
		throw new Error('Distance is not available');
	}
};

module.exports = generateDistance;
