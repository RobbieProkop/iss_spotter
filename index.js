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
const {fetchMyIP, fetchCoordsByIP} = require('./iss');

fetchMyIP((error, ip)=>{
  if(error){
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP: ", ip);
  fetchCoordsByIP(ip, (error, data)=>{
    // request(`https://freegeoip.app/json/${ip}`)
    // console.log(ip)
    console.log("error: ", error);
    console.log("data: ", data);
  })
});