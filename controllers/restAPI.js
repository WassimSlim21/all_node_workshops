
request = require('request-json');
var marketstacksRequest = request.createClient('http://api.marketstack.com/v1/eod?access_key=0be47498f189d5fecf2c307088cd804a&symbols=AAPL&');

var marketstacks = [];
var data = {}; 






  exports.getMarketStacksExterneAPI = (req, response) => {
    // date_from='+req.params.dateDebut+'&date_to='+req.params.dateFin
    marketstacksRequest.get('', (error, results) => {
        if (error) {
          throw error
        }
        data = JSON.parse(results.body);
        marketstacks = data;
      

        // driversExt.forEach(driver => {
            
        
        // });
        response.status(200).json(marketstacks)
      });
  
  }