const fs = require("fs");
const _ = require("lodash");

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
    let timeStartArray = trip.startTime.split(":");
    let timeStopArray = trip.stopTime.split(":");

    trip.timeInMinutes = getTripTimeInMinutes(timeStartArray, timeStopArray);

    const tripTimeInHours = getTripTimeInHours(timeStartArray, timeStopArray);

    const mph = trip.milesDriven / tripTimeInHours;

    return mph >= 5 && mph <= 100;
  });
}

function getTripTimeInMinutes(timeStartArray, timeStopArray) {
  return (
    60 * parseInt(timeStopArray[0]) +
    parseInt(timeStopArray[1]) -
    (60 * parseInt(timeStartArray[0]) + parseInt(timeStartArray[1]))
  );
}

function getTripTimeInHours(timeStartArray, timeStopArray) {
  const tripTimeInMinutes =
    60 * parseInt(timeStopArray[0]) +
    parseInt(timeStopArray[1]) -
    (60 * parseInt(timeStartArray[0]) + parseInt(timeStartArray[1]));
  return tripTimeInMinutes / 60;
}

function buildDriverReportMap(trips) {
  const driverReportMap = {};

  const filteredTrips = filterTrips(trips);

  filteredTrips.map(trip => {
    if (!driverReportMap.hasOwnProperty(trip.driver.name)) {
      driverReportMap[trip.driver.name] = {
        totalMiles: 0,
        totalTime: 0
      };
    }
    driverReportMap[trip.driver.name].totalMiles += Math.round(
      parseFloat(trip.milesDriven)
    );
    driverReportMap[trip.driver.name].totalTime += trip.timeInMinutes;
  });

  for (const name in driverReportMap) {
    const mph =
      driverReportMap[name].totalMiles / (driverReportMap[name].totalTime / 60);
    driverReportMap[name].mph = Math.round(mph);
    driverReportMap[name].name = name;
  }

  return driverReportMap;
}

function writeResultFile(finalReport, drivers) {
  var wstream = fs.createWriteStream("myOutput.txt");

  _.each(finalReport, function(driverReport) {
    wstream.write(
      `${driverReport.name}: ${driverReport.totalMiles} miles @ ${driverReport.mph} mph\n`
    );
  });

  // write 0 miles for drivers without trips
  drivers.map(driver => {
    if (!finalReport.hasOwnProperty(driver.name)) {
      wstream.write(`${driver.name}: 0 miles\n`);
    }
  });
  wstream.end();
}

module.exports = {
  createDriver,
  createTrip,
  filterTrips,
  buildDriverReportMap,
  writeResultFile
};
