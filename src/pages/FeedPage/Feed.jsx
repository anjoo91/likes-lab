import { useState, uesEffect, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import AddPuppyForm from "../../components/AddPuppyForm/AddPuppyForm";
import PostGallery from "../../components/PostGallery/PostGallery";

import { Grid } from "semantic-ui-react";

// this will import all the functions from postApi, and attach to an object call postsApi
import * as postsApi from "../../utils/postApi";

export default function FeedPage() {
  // The reasons we are setting posts state, is because then we can pass that data to the postgallery
  // where it will be rendered!
  const [posts, setPosts] = useState([]); // array of objects containing the likes as well)
  const [error, setError] = useState("");

  // EVERY TIME WE UPDATE STATE here, We will first make http request to the server 
  // to try and perform some CRUD operation.

  // (C)RUD
  // we will call this function in the handleSubmit of the AddPuppyForm, and pass to it 
  // the formData we created
  // this way when we get a response from the server we can easily update the state, since its 
  // in this component
  async function handleAddPost(data){
	try {
		const responseData = await postsApi.create(data)
		console.log(responseData, ' <- response from server in handleAddPost')
		setPosts([responseData.data, ...posts]); // emptying the previous posts in to the new
		// and then adding the new one we just created to the front (response.data)
	} catch(err){
		console.log(err, ' err in handleAddPost FeedPage')
		setError('Error Creating a Post! Please try again')
	}
  }

  // C(R)UD
  async function getPosts(){
	try {
		const responseFromTheServer = await postsApi.getAll(); // this is the fetch function from post utils
		console.log(responseFromTheServer)
		 setPosts(responseFromTheServer.posts)
	} catch(err){
		console.log(err, ' err in getPosts')
		setError('Error Fetching Posts, Check terminal')
	}
  }



  useEffect(() => {
	getPosts()
  }, []);// empty array says run the use effect once when the page loads up!


  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPuppyForm handleAddPost={handleAddPost}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostGallery posts={posts} itemsPerRow={1} isProfile={false}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
