/**
 * Represents a trip.
 * @constructor
 */
class Trip {
    constructor(driver, startTime, stopTime, milesDriven) {
        this.driver = driver;
        this.startTime = startTime;
        this.stopTime = stopTime;
        this.milesDriven = milesDriven;
    }
}

module.exports = Trip;