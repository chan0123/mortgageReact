import axios from 'axios';

const apiAddress = "https://api.api-ninjas.com/v1/interestrate"
const apiKey = "cbUacErklh2yX2/duXxCvQ==CzXo86j5Yz6UapWK"


const RateAPI = () => {

    axios.get(apiAddress, { headers: { 'X-Api-Key': apiKey } })
     .then(response => {
         // If request is good...
         console.log(response.data);
      })
     .catch((error) => {
         console.log('error ' + error);
      });

}

export default RateAPI;

