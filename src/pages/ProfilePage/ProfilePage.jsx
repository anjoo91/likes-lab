import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostGallery from '../../components/PostGallery/PostGallery'
import PageHeader from "../../components/Header/Header";

import userService from "../../utils/userService";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // grabbing the param from this route
  //  <Route path="/:username" element={<ProfilePage />} />
  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    async function getProfile() {
      // make the api call,
      // then log the response,
      // then update the state

      try {
        setLoading(true);
        const response = await userService.getProfile(username);
        console.log(response);
        setPosts(response.posts);
        setUser(response.user);
        setLoading(false)
      } catch (err) {
        setError("Error loading profile");
        console.log(err, " err in profile");
      }
    }

    getProfile();
  }, []);

  if (loading) {
    return (
      <>
        <PageHeader />
        <h1>Loading....</h1>
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostGallery posts={posts} itemsPerRow={3} isProfile={true}/> 
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
