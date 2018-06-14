import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import axios from 'axios';

class DeleteTripButton extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDelete(trip_id, event) {

    console.log(trip_id)

    event.preventDefault();

    axios.delete('https://travel-buddy2.herokuapp.com/trips', {data: {
          // User ID
          trip_id: trip_id,
        }})
    .then((response)=>{
      console.log(response);

      if (response.status === 200) {
        console.log('SUCCESSFULLY DELETED TRIP: ', response.data);
        // ADD Trip to state if successful
        window.location.reload();

        // this.props.handleClose();
      }
      else if (response.status === 404) {
        console.log('FAILED TO DELETE TRIP!')
        // this.setState({failedCreate: true})
      }

    })
    .catch((error)=>{
      // IF LOGING UNSECCESFUL DUE TO NETWORK PROBLEM:
      console.log(error)
      this.setState({failedCreate: true});
    });





  }

  render(){
    return (
      <React.Fragment>
        <Button bsStyle="danger" onClick={ (e) => this.handleDelete(this.props.trip_id, e) }>
          <Glyphicon glyph="trash" />
        </Button>
      </React.Fragment>
    );
  }
}

export default DeleteTripButton;