var assert = require('chai').assert
const helpers = require('../helpers');
const models = require('../models/models')

describe('models', function() {
    describe('models module', function() {
        it('models module should have a Driver and Trip class', function() {
            assert.isOk(models, 'models is ok');
            assert.isOk(models.Driver, 'models.Driver is ok');
            assert.isOk(models.Trip, 'models.Trip is ok');
            assert.typeOf(models.Driver, 'function', 'models.Driver is a function');
            assert.typeOf(models.Trip, 'function', 'models.Trip is a function');
        });
    });

    describe('create a driver', function() {
        it('should return a driver with name Alex when created with Alex as an argument', function() {
            const driver = new models.Driver('Alex');
            assert.isOk(driver, 'driver is ok');
            assert.equal(driver.name, 'Alex');
            assert.typeOf(driver.name, 'string', 'driver.name is a string');
        });
    });
    
    describe('create a trip', function() {
        it('should return a trip with Alex as the driver, a start time, an end time, and miles driven', function() {
            const driver = new models.Driver('Alex');
            const trip = new models.Trip(driver, '12:01', '13:16', 42.0);

            assert.isOk(trip, 'trip is ok');
            assert.equal(trip.driver, driver);
            assert.typeOf(trip.driver, 'object', 'trip.driver is an object')
            assert.equal(trip.startTime, '12:01');
            assert.typeOf(trip.startTime, 'string', 'trip.startTime is a string');
            assert.equal(trip.stopTime, '13:16');
            assert.typeOf(trip.stopTime, 'string', 'trip.stopTime is a string')
            assert.equal(trip.milesDriven, 42.0);
            assert.typeOf(trip.milesDriven, 'number', 'trip.milesDriven is a number')
        });
    });

});

describe('helpers', function() {
    it('should return an object that is ok and has methods that are ok', function() {
        assert.isOk(helpers, 'helpers is ok');
        assert.isOk(helpers.createDriver, 'helpers.createDriver is ok');
        assert.isOk(helpers.createTrip, 'helpers.createTrip is ok');
        assert.isOk(helpers.filterTrips, 'helpers.filterTrips is ok');
        assert.isOk(helpers.buildDriverReportMap, 'helpers.buildDriverReportMap is ok');
        assert.isOk(helpers.writeResultFile, 'helpers.writeResultFile is ok');
    });

    it('should return a driver with name Alex when a an array with a string is passed to create driver', function() {
        const driver = helpers.createDriver(['Driver', 'Alex']);
        assert.isOk(driver, 'driver is ok');
        assert.equal(driver.name, 'Alex', 'Driver name is Alex');
    });

    it('should return a trip with valid driver and valid startTime, stopTime, and milesDriven', function() {
        const driver1 = new helpers.createDriver(['Driver', 'Alex']);
        const driver2 = new helpers.createDriver(['Driver', 'John']);

        const startTime = '12:00', stopTime = '12:30', milesDriven = 40;

        const trip = helpers.createTrip(['Trip', 'Alex', startTime, stopTime, milesDriven], [driver1, driver2]);

        assert.isOk(trip, 'trip is ok');
        assert.isOk(trip.driver, 'trip.driver is ok');
        assert.typeOf(trip.driver, 'object', 'trip.driver is an object');
        assert.typeOf(trip.startTime, 'string', 'trip.startTime is a string');
        assert.typeOf(trip.stopTime, 'string', 'trip.stopTime is a string');
        assert.typeOf(trip.milesDriven, 'number', 'trip.number is a number');
    })
});