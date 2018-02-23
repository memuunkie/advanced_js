// use rest parameters
function getMostFollowers(...usernames) {
	let baseUrl = 'https://api.github.com/users/';
	// map the array of usernames, return a .getJSON
	let urls = usernames.map(username => $.getJSON(baseUrl + username));
	// promise all the urls
	return Promise.all(urls).then(function(data){
		// sorts the data, returns the largest at index[0]
		let max = data.sort((a,b) => a.followers < b.followers)[0];
		return `${max.name} has the most followers with ${max.followers}`;
	});
}

// re-write as an asynchronous function
async function getMostFollowers(...usernames){
	// stays the same/
	let baseUrl = 'https://api.github.com/users/';
	let urls = usernames.map(username => $.getJSON(baseUrl + username));
	// creates a variable to hold all the results from the Promise
	let results = await Promise.all(urls);
	// once results finishes, sorts data to find largest, returns string
	let max = results.sort((a,b) => a.followers < b.followers)[0];
	return `${max.name} has the most followers with ${max.followers}`;
}

function starWarsString(id) {
	// to hold all string additions
	var str = '';
	// make the call to the api
	return $.getJSON(`https://swapi.co/api/people/${id}/`).then(function(data){
		// adds to string
		str += `${data.name} is featured in `;
		// data.films is an array of api urls
		let filmData = data.films[0];
		return $.getJSON(filmData);
	}).then(function(res) {
		// gets the result from the call to filmData url
		str += `${res.title}, directed by ${res.director} `;
		// res.planets is an array of api urls
		let planetData = res.planets[0];
		return $.getJSON(planetData);
	}).then(function(res) {
		// gets the result from the call to planetData url
		str += `and it takes place on ${res.name}`;
		return str;
	}).then(function(finalString) {
		// gets the finished str from the previous 'then'
		return finalString;
	});
}