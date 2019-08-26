const program = require("commander");
const chalk = require("chalk");
const csv = require("csv");
const _ = require("lodash");

const fs = require("fs");

const helpers = require("./helpers");
const file = process.argv[2];

program
  .version("0.0.1")
  .option("-l, --list [list]", "list of drivers/trips in txt file")
  .parse(process.argv);


function run() {
  const drivers = [];
  const trips = [];

  let parse = csv.parse;
  let stream = fs.createReadStream(file).pipe(parse({ delimiter: "\n" }));

  stream.on("data", function(data) {
    let line = data[0];
    let wordArray = line.split(" ");
    if (wordArray[0] === "Driver") {
      const driver = helpers.createDriver(wordArray);
      drivers.push(driver);
      console.log(
        chalk.magenta(
          "we have a new driver => ",
          JSON.stringify(driver, null, 4)
        )
      );
    } else if (wordArray[0] === "Trip") {
      const trip = helpers.createTrip(wordArray, drivers);
      console.log(
        chalk.magenta("we have a new trip => ", JSON.stringify(trip, null, 4))
      );
      trips.push(trip);
    } else {
      console.error(chalk.red("unknown error"));
    }
  });

  stream.on("error", function(error) {
    console.error(chalk.red("There was an error reading the file => ", error));
  });

  stream.on("end", function() {
    const driverReportMap = {};

    const filteredTrips = helpers.filterTrips(trips);

    filteredTrips.map(trip => {
        if (!driverReportMap.hasOwnProperty(trip.driver.name)) {
            driverReportMap[trip.driver.name] = {
                totalMiles: 0,
                totalTime: 0
            }
        }
        driverReportMap[trip.driver.name].totalMiles += Math.round(parseFloat(trip.milesDriven));
        driverReportMap[trip.driver.name].totalTime += trip.timeInMinutes;
    });

    for (const name in driverReportMap) {
        const mph = driverReportMap[name].totalMiles / (driverReportMap[name].totalTime / 60)
        driverReportMap[name].mph = Math.round(mph);
        driverReportMap[name].name = name;
     }


    
    writeResultFile(driverReportMap, drivers);
    console.log(chalk.green('filtered => ', JSON.stringify(filteredTrips, null, 4)));
  });
}

function writeResultFile(finalReport, drivers) {
    var wstream = fs.createWriteStream('myOutput.txt');

    _.each(finalReport, function(driverReport) {
        wstream.write(`${driverReport.name}: ${driverReport.totalMiles} miles @ ${driverReport.mph} mph\n`);
    })

    // write 0 miles for drivers without trips
    drivers.map(driver => {
        if (!finalReport.hasOwnProperty(driver.name)) {
            wstream.write(`${driver.name}: 0 miles\n`);
        }
    })
    wstream.end();
}


run();
