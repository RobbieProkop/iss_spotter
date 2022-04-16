// const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss_promised');

const { nextISSTimesForMyLocation } = require("./iss_promised");
const printPassTimes = require("./index");

// console.log(nextISSTimesForMyLocation());
nextISSTimesForMyLocation().then((passTimes) => {
  printPassTimes(passTimes);
});
// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body))
