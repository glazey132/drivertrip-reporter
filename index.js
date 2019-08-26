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
      trips.push(trip);
      console.log(
        chalk.magenta("we have a new trip => ", JSON.stringify(trip, null, 4))
      );
    } else {
      console.error(chalk.red("unknown error"));
    }
  });

  stream.on("error", function(error) {
    console.error(chalk.red("There was an error reading the file => ", error));
  });

  stream.on("end", function() {
    const driverReportMap = helpers.bulidDriverReportMap(trips);
    helpers.writeResultFile(driverReportMap, drivers);
  });
}

run();
