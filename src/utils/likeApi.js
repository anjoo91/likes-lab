import tokenService from "./tokenService";

const BASE_URL = '/api';

export function create(postId){
    return fetch(`${BASE_URL}/posts/${postId}/likes`), {
        method:'POST',
        headers: {
            // sending jwt
            Authorization: `Bearer ${tokenService.getToken()}`
        }
    }.then(responseFromTheServer => {
        if(responseFromTheServer.ok) 
            return responseFromTheServer.json()
        // else
        throw new Error('Something went wrong in create like');
    })
};

export function removeLike(likeId){
    return fetch(`${BASE_URL}/likes/${likeId}`, {
        method:'POST',
        headers: {
            // sending jwt
            Authorization: `Bearer ${tokenService.getToken()}`
        }
    }).then(responseFromTheServer => {
            if(responseFromTheServer.ok)
                return responseFromTheServer.json();
            // else
            throw new Error('Something went wrong in removeLike');
    })
}