import React from 'react';
import { Image, Icon, Label, Header, Modal, Button } from 'semantic-ui-react';

const ListingDisplayImage = ({ image, handleDelete, index }) => {
  return (
    <Modal trigger={<Image src={image} size="small" wrapped />} basic size='small'>
      <Header icon='trash outline' content='Delete Listing' />
      <Modal.Content>
        <p>Are you sure you would like to delete this picture?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' inverted>
          <Icon name='remove' /> No
        </Button>
        <Button onClick={() => handleDelete(index)} color="green" inverted>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ListingDisplayImage.propTypes = {
  handleDelete: React.PropTypes.func.isRequired,
  image: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
};

export default ListingDisplayImage;