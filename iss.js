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
};

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

  });
};

const fetchISSFlyOverTimes = function({latitude, longitude}, callback){
  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body)=>{
    if(error) {
      callback(error, null);
      return;
    };
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinated for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    };
    const flyOverTimes = JSON.parse(body).response;
    callback(error, flyOverTimes)
  });

};

const nextISSTimesForMyLocation = function(callback){
  fetchMyIP((error,ip)=>{
    if(error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip,(error, location) => {
      if(error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, flyOverTimes)=> {
        if(error) {
          return callback(error, null);
        }
        callback(null, flyOverTimes)
      })
    })
  })
}
module.exports = {nextISSTimesForMyLocation};