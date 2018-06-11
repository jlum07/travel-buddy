import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import axios from 'axios';

class DeleteButton extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDelete(itinerary_id, event) {

    console.log(itinerary_id);

    event.preventDefault();

    axios.delete(`http://localhost:3001/trips/${this.props.trip_id}`, {data: {
      // User ID
      itinerary_id: itinerary_id
    }})
    .then((response)=>{
      console.log(response);

      if (response.status === 200) {
        console.log('SUCCESSFULLY DELETED ITINERARY EVENT: ', response.data);
        // ADD Trip to state if successful
        window.location.reload();

        // this.props.handleClose();
      }
      else if (response.status === 404) {
        console.log('FAILED TO DELETE ITINERARY EVENT!')
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
        <Button bsStyle="danger" onClick={ (e) => this.handleDelete(this.props.itinerary_id, e) }>
          <Glyphicon glyph="trash" />
        </Button>
      </React.Fragment>
    );
  }
}

export default DeleteButton;