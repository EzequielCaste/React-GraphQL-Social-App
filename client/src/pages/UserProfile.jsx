import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Button, Card, Form, TextArea, Icon, Image, Modal, Container, Popup } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const UserProfile = ({ edit = false }) => {
  const [openModal, setOpenModal] = useState(false);

  const { userId } = useParams();

  const { user } = useContext(AuthContext);

  const imageEditIcon = { position: 'absolute', margin: 0, top: 5, right: 5 }

  const { values, onChange, onSubmit } = useForm(updateProfileCallback, {
    photoURL: user.photoURL
  });

  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    update() {
      setOpenModal(false);
    },
    variables: {
      userId,
      photoURL: values.photoURL
    },
  });

  function updateProfileCallback() {
    updateUserMutation()
  }

  if (user && user.id === userId) {
    return (
      <Container textAlign='center' >
        <h1>User Profile</h1>
        <Card centered>
          <Image
            src={user.photoURL}
          />
          <Popup
            trigger={
              <Button
                basic size='small'
                inverted
                icon="edit"
                style={imageEditIcon}
                onClick={() => setOpenModal(true)}
              />
            }
          >
            <Popup.Content>
              <p>Change profile picture</p>
            </Popup.Content>
          </Popup>

          <Card.Content>
            <Card.Header>{user.username}</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>
              Daniel is a comedian living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {user.email}
            </a>
          </Card.Content>
        </Card>

        <Modal
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
        </Modal>
      </Container>)
  }

  return (
    <Container textAlign='center' >
      <h1>User Not Found</h1>
    </Container>
  )
};

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($userId: ID! $photoURL: String!) {
    updateUser(userId: $userId photoURL: $photoURL) {
      id
      email
      username
      createdAt
      photoURL
    }
  }
`;

export default UserProfile;