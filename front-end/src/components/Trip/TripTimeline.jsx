import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { Table, Panel, Button, Glyphicon } from 'react-bootstrap';
import 'react-vertical-timeline-component/style.min.css';
import './TripTimeline.css';


class TripTimeline extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){

    const itineraryList = this.props.itinerary.map(event => {
      return (
        <VerticalTimelineElement
          className="vertical-timeline-element--city"
          date={event.start_date + " - " + event.end_date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Glyphicon glyph="home" />}
        >
          <h3 className="vertical-timeline-element-title">{event.name}</h3>
          <h4 className="vertical-timeline-element-subtitle">{event.type}</h4>
          <p>
            The quick brown fox
          </p>
        </VerticalTimelineElement>
      )
    })


    // const citiesList = this.props.cities.map(event => {
    //   return (
    //     <tr>
    //       <td>{event.name}</td>
    //       <td>{event.start_date}</td>
    //       <td>{event.end_date}</td>
    //       <td><EditModal event={event} /></td>
    //       <td><DeleteButton itinerary_id={event.id} /></td>
    //     </tr>
    //   )
    // })

    return (
      <React.Fragment>
        <VerticalTimeline>
          {itineraryList}
        </VerticalTimeline>
      </React.Fragment>
    );
  }
}

export default TripTimeline;
