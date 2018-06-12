import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama
} from "react-google-maps";
import React from "react";
import compose from "recompose/compose";
import withProps from "recompose/withProps";

let props = {
  googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHqiMIL0D9q9stG8tDcJ7shVQGyGYfw6I&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `400px` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `400px` }} />
};

const MyMapComponent = compose(
  withProps(props),
  withGoogleMap
)(props => {
  console.log("props", props);
  return (

      <GoogleMap defaultZoom={8} defaultCenter={props.center}>
        <StreetViewPanorama defaultPosition={props.center} visible={props.visible} />
      </GoogleMap>

  );
});

class Streetview extends React.PureComponent {
  constructor() {
    super();

    this.state = {};
  }

  componentDidUpdate() {
    console.log("updated");
  }

  render() {
    console.log("bruhhh", this.props.center);
    return <MyMapComponent center={this.props.center} visible={this.props.visible}/>;
  }
}

export default Streetview;
