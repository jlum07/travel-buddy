import React from "react";
import { Panel, PanelGroup } from "react-bootstrap";
import "./PoiList.css";

class PoiList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: "1"
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    let poi_list = this.props.points_of_interest[
      this.props.currentCat.eventKey
    ].map((element, index) => {
      return (
        <Panel eventKey={`${index + 1}`}>
          <Panel.Heading>
            <Panel.Title toggle>
              {element.title}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <p> {element.ranking} </p>
              <p> {element.address} </p>
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
