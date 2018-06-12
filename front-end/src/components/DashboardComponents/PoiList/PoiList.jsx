import React from "react";
import { Image, Panel, PanelGroup, Button } from "react-bootstrap";
import "./PoiList.css";

class PoiList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: null
    };
  }

  handleSelect(activeKey) {
    console.log(activeKey, this.state.activeKey, activeKey !== this.state.activeKey)
    if (activeKey !== null) {
      this.setState({ activeKey });
      let input = {
        name: activeKey,
        position: this.props.points_of_interest[this.props.currentCat.eventKey][
          activeKey - 1
        ].location
      };
      this.props.setActiveMarker(input);
    } else {
      this.setState({activeKey: null})
      this.props.setActiveMarker(null)
    }
  }

  render() {

    let poi_list = this.props.points_of_interest[
      this.props.currentCat.eventKey
    ].map((element, index) => {
      console.log(element)
      return (
        <Panel eventKey={`${index + 1}`}>
          <Panel.Heading>
            <Panel.Title toggle>{element.title}</Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <Image src={element.trip_advisor_picture} className="poiImage" rounded />
              <p> {element.ranking} </p>
              <p> {element.address} </p>
              <div data-name={index} onClick={(e) => this.props.toggleModal(e.currentTarget.dataset)}>
                <Button  name={"hi"}>
                  Modal
                </Button>
              </div>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      );
    });

    return (
      <PanelGroup
        accordion
        id="panel-container"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
        {poi_list}
      </PanelGroup>
    );
  }
}

export default PoiList;
