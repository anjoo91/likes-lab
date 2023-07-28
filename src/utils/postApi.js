

// we need to use the tokenService to get the token out of localstorage
import tokenService from "./tokenService";

const BASE_URL = '/api/posts/';
// You can look in the server.js at this line app.use('/api/posts', require('./routes/api/posts'));

// Making a request to create a POST
// this function will occur when a user is logged in
// so we have to send the token to the server!
export function create(data){
	return fetch(BASE_URL, {
		method: 'POST',
		body: data, // since we are sending over a file/photo, no need to jsonify, since we are sending a multipart/formdata request
		headers: {
			// convention for sending jwts
			
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			// so the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(responseFromTheServer => {
		if(responseFromTheServer.ok) return responseFromTheServer.json() // so if everything went well in the response return 
		//the parsed json to where we called the function

		throw new Error('Something went wrong in create Post'); // this will go to the catch block when we call the function in the AddPostPuppyForm
		// handleSubmit
	})
}

// call this function in a useEffect in the feedpage
// this funciton is making a request to this route
// on express server router.get('/', postsCtrl.index) /api/posts
export function getAll(){
	return fetch(BASE_URL, {
		method: 'GET',
	    headers: {
			// convention for sending jwts
			
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			// so the server knows who the request is coming from when the client is trying to make a POST
		}	
	}).then(responseFromTheServer => {
		if(responseFromTheServer.ok) return responseFromTheServer.json() // so if everything went well in the response return 
		//the parsed json to where we called the function

		throw new Error('Something went wrong in getAll posts, check the terminal!'); // this will go to the catch block when we call the function in the AddPostPuppyForm
		// handleSubmit
	})
}