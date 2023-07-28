import React, { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";


// handleAddPost comes as prop from the app component
export default function AddPuppyForm({handleAddPost}) {
  // create the state, pay attention to how the inputs are setup!o
  const [state, setState] = useState({
    caption: ''
  })

  const [selectedFile, setSelectedFile] = useState('')

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
  }

  // The function that handles the changes on the input, Look at the inputs for the name of it

  function handleSubmit(e) {
    // Since we are sendinga file, prepare the object as formData to send to the server
    const formData = new FormData()
    formData.append('caption', state.caption)
    formData.append('photo', selectedFile)
    
    // call handleAddPost, which calls our postsApi.create function in the utils folder
    handleAddPost(formData)
  }

  return (

        <Segment>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Input
              className="form-control"
              name="caption"
              value={state.caption}
              placeholder="What's on your pups mind?"
              onChange={handleChange}
              required
            />
            <Form.Input
              className="form-control"
              type="file"
              name="photo"
              placeholder="upload image"
              onChange={handleFileInput}
            />
            <Button type="submit" className="btn">
              ADD PUPPY
            </Button>
          </Form>
        </Segment>
   
  );
}
