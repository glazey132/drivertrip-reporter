//driver name, start time, stop time, miles driven.
class Trip {
    constructor(driver, startTime, stopTime, milesDriven) {
        this.driver = driver;
        this.startTime = startTime;
        this.stopTime = stopTime;
        this.milesDriven = milesDriven;
    }
}

module.exports = Trip;