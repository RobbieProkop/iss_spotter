const request = require('request');
const fetchMyIP = function(callback){

  request("https://api.ipify.org?format=json", (error, response, body)=>{
    // console.log("Error: ", error);
    const ip = JSON.parse(body).ip;
    // console.log("Here's the IP: ", JSON.parse(body).ip);
    if(error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, ip) 
    return ;
  });
}

const fetchCoordsByIP = function(ip, callback){
  request(`https://freegeoip.app/json/${ip}`, (error, response, body)=>{
    if(error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinated for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const {latitude, longitude } = JSON.parse(body);
    callback(null, {latitude, longitude})

  })
}

module.exports = {fetchMyIP, fetchCoordsByIP};