const Models = require("./models/Models");

function createDriver(wordArray) {
  const name = wordArray[1];
  const driver = new Models.Driver(name);

  return driver;
}

function createTrip(wordArray, drivers) {
  const driver = drivers.filter(driver => driver.name === wordArray[1])[0];
  const startTime = wordArray[2];
  const stopTime = wordArray[3];
  const milesDriven = wordArray[4];

  const trip = new Models.Trip(driver, startTime, stopTime, milesDriven);

  return trip;
}

function filterTrips(trips) {

    return trips.filter(trip => {
        let timeStartArray = trip.startTime.split(':');
        let timeStopArray = trip.stopTime.split(':');

        trip.timeInMinutes = getTripTimeInMinutes(timeStartArray, timeStopArray);

        const tripTimeInHours = getTripTimeInHours(timeStartArray, timeStopArray);
        
        const mph = trip.milesDriven / tripTimeInHours;
        
        return mph >= 5 && mph <= 100;
    });
}

function getTripTimeInMinutes(timeStartArray, timeStopArray) {
    return ((60 * parseInt(timeStopArray[0])) + parseInt(timeStopArray[1])) - ((60 * parseInt(timeStartArray[0])) + parseInt(timeStartArray[1]));
}

function getTripTimeInHours(timeStartArray, timeStopArray) {
       const tripTimeInMinutes = ((60 * parseInt(timeStopArray[0])) + parseInt(timeStopArray[1])) - ((60 * parseInt(timeStartArray[0])) + parseInt(timeStartArray[1]));
       return tripTimeInMinutes / 60;
}

module.exports = {
  createDriver,
  createTrip,
  filterTrips
};
