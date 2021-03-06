import { Table, Modal, Header, Image } from 'semantic-ui-react';
import React from 'react';
import ReplyFormModal from './ReplyFormModal';

const MessagesTable = ({ allMessages, convertTime, onChange, onSubmit }) =>
  <Table unstackable selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Subject</Table.HeaderCell>
        <Table.HeaderCell>Sender</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {
      allMessages.map(message =>
        <Modal
          key={message.id}
          size="small"
          trigger={
            <Table.Row>
              <Table.Cell>
                <Header as="h4" color="green">{message.title}</Header>
                {`Received about ${convertTime(message.createdAt)}`}
              </Table.Cell>
              <Table.Cell>{`${message.sender.firstName} ${message.sender.lastName}`}</Table.Cell>
              <Table.Cell textAlign="right">None</Table.Cell>
            </Table.Row>
          }
        >
          <Modal.Header>{message.title}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="small" src="/client/src/assets/half-raptor.png" />
            <Modal.Description>
              <Header>{message.title}</Header>
              <p>{`From: ${message.sender.firstName} ${message.sender.lastName}`}</p>
              <p>{message.body}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <ReplyFormModal
              onChange={onChange}
              onSubmit={onSubmit}
              listingId={message.post.id}
              userId={message.sender.id}
              senderId={message.user.id}
            />
          </Modal.Actions>
        </Modal>,
        )
      }
    </Table.Body>
  </Table>;

MessagesTable.propTypes = {
  allMessages: React.PropTypes.array.isRequired,
  convertTime: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default MessagesTable;
