import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Icon, Image, Label, Container } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../util/firestore';
import { useMutation } from '@apollo/client';
import moment from 'moment';

import { FETCH_POSTS_QUERY, UPDATE_USER_MUTATION } from '../util/graphql';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

const UserDetails = ({ user, auth = false }) => {
  const [newPhoto, setNewPhoto] = useState(user?.photoURL);
  const [file, setFile] = useState(null)
  const { login } = useContext(AuthContext)
  const { values, onChange, onSubmit } = useForm(updateProfileCallback, {
    photoURL: newPhoto
  });

  useEffect(() => {
    if (user?.photoURL !== newPhoto) {
      updateUserMutation()
    }
  }, [newPhoto])

  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      userId: user?.id,
      photoURL: newPhoto
    },
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
    update(store, { data: { updateUser } }) {
      localStorage.removeItem('jwtToken')
      localStorage.setItem('jwtToken', updateUser.token)
      
      login(updateUser)
      setFile(null)

      values.photoURL = '';
    },

  });

  function updateProfileCallback() {
    uploadImage();
  }

  const uploadImage = async () => {
    if (file === null) return;

    const imageRef = ref(storage, `images/${file.name}`)

    await uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(url => {
            setNewPhoto(url)
          })
      })
  }

  return (
    <Container textAlign='center' >
      <h1>User Profile</h1>
      <Card centered>
        <Image
          src={newPhoto}
        />
        {
          auth && (
            <Form loading={loading} onSubmit={onSubmit} >
              <Form.Field>
                <Button as="label" className='choose-file-btn' htmlFor="file" type="button">
                  Choose file
                </Button>
                <input 
                  accept="image/*" 
                  type="file" 
                  id="file" 
                  style={{ display: "none" }} 
                  onChange={e => setFile(e.target.files[0])} 
                />
                <Button primary type="submit">Upload image</Button>
              </Form.Field>
              {
                file?.name && (
                  <Form.Field className='form-field-file'>
                    <Label className='form-selected-file'>
                      <Icon name='file' />
                      {file.name}
                      <Button
                        basic size='small'
                        inverted
                        icon="delete"
                        onClick={() => setFile(null)}
                      />
                    </Label>
                  </Form.Field>
                )
              }
            </Form>
          )
        }

        <Card.Content>
          <Card.Header>{user?.username}</Card.Header>
          <Card.Meta>Joined  {moment(user?.createdAt).fromNow()}</Card.Meta>
          {/* <Card.Description>
              Daniel is a comedian living in Nashville.
            </Card.Description> */}
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {user?.email}
          </a>
        </Card.Content>
      </Card>

      {/* <Modal
          dimmer="blurring"
          size="mini"
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>Change profile picture</Modal.Header>
          <Modal.Content>
            <Form onSubmit={onSubmit} >
              <Form.Field
                control={TextArea}
                name="photoURL"
                value={values.photoURL}
                onChange={onChange}
              />
              

            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button secondary onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={updateUserMutation}>
              Save
            </Button>
          </Modal.Actions>
        </Modal> */}
    </Container>
  )
}

export default UserDetails