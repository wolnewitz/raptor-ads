import React from 'react';
import { Grid, Image, Header, Card, Divider } from 'semantic-ui-react';
import { Link } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import getAverageRating from '../helpers/getAverageRating';
import makeNamePossessive from '../helpers/makeNamePossessive';

const listings = [1,2,3,4,5,6];

const ProfileDashboard = ({ user, userListings, onListingClick, isLoggedInUser }) =>
  <Grid width={16} >
    <Grid.Column width={3} textAlign="center" className="profileContainer">
      <Card style={{ width: '200px' }}>
        <Image src={user.profile_img_path || '/client/src/assets/blankProfile.png'} />
        <Header>
          { `${user.firstName} ${user.lastName}` }
        </Header>
        <Card.Content>
          <Header className="dateHeader">
            Member since:
          </Header>
          { new Date(user.createdAt).toLocaleDateString() }
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Header className="dateHeader" style={{ marginBottom: '7px' }}>
            {makeNamePossessive(user.firstName)} rating:
          </Header>
          {user.ratings && user.ratings.length === 0 ? <p style={{ marginTop: '0', marginBottom: '7px' }}>None</p> :
            <StarRatingComponent
              name={'average'}
              value={getAverageRating(user.ratings)}
              starColor="#31b234"
              editing={false}
              textAlign="center"
            />
          }
          <Link className="ratingsHeader" to={`/user/${user.id}/ratings`}>
          <Header className="ratingsHeader">
            View {makeNamePossessive(user.firstName)} ratings
            </Header>
          </Link>
          { isLoggedInUser ? '' :
            <Link className="ratingsHeader" to={`/user/${user.id}/ratings/new`}>
              <Header className="ratingsHeader">
                Write a Review for { user.firstName }
              </Header>
            </Link>
          }
        </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column width={13}>
      <Header>{makeNamePossessive(user.firstName)} listings:</Header>
      <Card.Group itemsPerRow={1} stackable>
        {userListings && userListings.map(listing => {
          let picturePath;
          if (listing.pictures[0]) {
            picturePath = listing.pictures[0].img_path;
          } else {
            picturePath = '/client/src/assets/noImageAvailable.jpg';
          }
          return (
            <Card
              className="dashboardCard"
              onClick={() => onListingClick(listing.id)}
            >
              <Card.Header>
                <Image
                  floated="left"
                  style={{ height: '160px', width: '160px' }}
                  src={picturePath}
                />
                <Header style={{ marginTop: '6px', marginBottom: '0' }} as={'h3'} color="green">
                  {listing.title}
                </Header>
                <Divider/>
                <Card.Content style={{ color: 'black' }}>
                  {listing.body}
                </Card.Content>
                <Card.Content style={{ marginTop: '63px', float: 'right', marginRight: '5px', color: 'black' }}>
                {listing.city}, {listing.state}
                </Card.Content>
              </Card.Header>
            </Card>
          );
        })}
      </Card.Group>
    </Grid.Column>
  </Grid>;

export default ProfileDashboard;
