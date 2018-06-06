import React from 'react'
import { Image } from 'react-bootstrap'

class Map extends React.Component {
  render(){
    return (
      // This works for the url: /toronto, but NOT when the route is: /cities/toronto ?????
      <Image id='map' src="../assets/Toronto-Map.jpg" rounded />
      )
  }
}

export default Map;


