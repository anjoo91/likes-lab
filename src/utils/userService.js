import tokenService from './tokenService';



const BASE_URL = '/api/users/';


// this fetch request is making an http POST request to our server
// POST /api/users/signup

// to run the controller function in our routes//users file
// router.post("/signup",  usersCtrl.signup);

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    // when you're sending a file there should no headers, the browser will detect request, 
    // and apply the proper headers `multipart/formdata` request enctype
    // headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
    // what do datatype do you need to change this too?
    // this is the contents of the form that you want to send to the server
    // user must be an object in order JSONIFY
    body: user // if user is formData no need to jsonify
  })
  // the .thens occur when we get a response from the server!
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}



function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

// you are logged in so what do you need to send in the headers!
function getProfile(username){
  return fetch(`${BASE_URL}${username}`, {
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

export default {
  signup,
  getUser,
  logout,
  login,
  getProfile
};