//steps
// define a funtion that will get my IP address. That will be used to get my geolocation
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
*/
const request = require('request');
// const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(flyOverTimes){
  for(const pass of flyOverTimes) {
    const newDate = new Date(0);
    const utcSeconds = pass.risetime;
    const duration = pass.duration;
    newDate.setUTCSeconds(utcSeconds)
    console.log(`Next Pass will be ${newDate} for ${duration} seconds!`)
  };
};

nextISSTimesForMyLocation((error, flyOverTimes) => {
  if(error) {
    return console.log("Uh oh, It didn't work!", error)
  }
  printPassTimes(flyOverTimes)
})
// fetchMyIP((error, ip)=>{
//   if(error){
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
//   fetchCoordsByIP(ip, (error, coords)=>{
//     // console.log("error: ", error);
//     // console.log("coords: ", coords);
//     fetchISSFlyOverTimes(coords, (error, flyOverTimes) =>{
//       if(error){
//         console.log("SOmething went wrong", error)
//         return;
//       }
//       console.log("flyovertimes index.js: ", flyOverTimes);
//       // let utcSeconds = flyOverTimes[0].risetime;
//       // console.log("utc seconds: ", utcSeconds)
//       // let date = new Date(0);
//       // console.log("date: ", date)
//       // date.setUTCSeconds(utcSeconds);
//       // console.log("updated date: ",date)

      
//       // nextISSTimesForMyLocation((error, flyOverTimes) => {
//       //   if(error) {
//       //     return console.log("Uh oh, It didn't work!", error)
//       //   }
//       //   console.log(`Next pass at${flyOverTimes[0]}`)
//       // })
//     })
//   })
// });


// nextISSTimesForMyLocation((error, passTimes) =>{
//   if (error){
//     return console.log("It didn't work", error);
//   }
//   //success
//   console.log(passTimes);
// })