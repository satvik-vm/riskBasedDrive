const fetch = require("node-fetch");

// __columns_to_use = [
//     "Login Timestamp",
//     "User ID",
//     "IP Address",
//     "Country",
//     "ASN",
//     "User Agent String",
//     "Browser Name and Version",
//     "OS Name and Version",
//     "Device Type",
//     "Login Successful"
// ]

const data = {
    "User ID": [8650157434636892],
    "IP Address": ['81.166.208.86'],
    "Country": ['NO'],
    "ASN": [29695],
    "User Agent String": ['Mozilla/5.0  (iPad; CPU OS 7_1 like Mac OS X) AppleWebKit/533.1 (KHTML, like Gecko Version/4.0 Mobile Safari/533.1 variation/277457'],
    "Browser Name and Version": ['Android 2.3.3.2672'],
    "OS Name and Version": ['iOS 7.1'],
    "Device Type": ['mobile'],
    "Login Successful": [true]
}

// const data = [[0, 8650157434636892312, '81.166.208.86', 'NO', 29695, 'Mozilla/5.0  (iPad; CPU OS 7_1 like Mac OS X) AppleWebKit/533.1 (KHTML, like Gecko Version/4.0 Mobile Safari/533.1 variation/277457', 'Android 2.3.3.2672', 'iOS 7.1', 'mobile', true]]

const risk_analysis = (data) =>{
	console.log(data);
	fetch('http://127.0.0.1:5000/risk_analysis', {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data: data })
	})
			.then(response => response.text())
			.then(result => {
					console.log(result);
			})
			.catch(error => {
					console.error('Error:', error);
			});
}

module.exports = risk_analysis;