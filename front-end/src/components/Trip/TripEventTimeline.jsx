import React from 'react';
import {Timeline, TimelineEvent} from 'react-event-timeline';
// import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { Table, Panel, Button, Glyphicon } from 'react-bootstrap';
import FaBuilding from 'react-icons/lib/fa/building';
// import 'react-vertical-timeline-component/style.min.css';
// import './TripTimeline.css';

// https://www.npmjs.com/package/react-event-timeline

class TripEventTimeline extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){

    const itineraryList = this.props.itinerary.map(event => {
      return (
        <div id="timeline-div">
            <TimelineEvent
            className="trip-timeline"
            title={event.name}
            subtitle={event.start_date + " to " + event.end_date}
            icon={<FaBuilding />}
            // bubbleStyle={{width: "20px"}}
            >
              {event.description}
            </TimelineEvent>
        </div>
      )
    })

    // const itineraryList = this.props.itinerary.map(event => {
    //   return (
    //     <VerticalTimelineElement
    //       className="vertical-timeline-element--city"
    //       date={event.start_date + " - " + event.end_date}
    //       iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //       icon={<Glyphicon glyph="home" />}
    //     >
    //       <h3 className="vertical-timeline-element-title">{event.name}</h3>
    //       <h4 className="vertical-timeline-element-subtitle">{event.type}</h4>
    //       <p>
    //         The quick brown fox
    //       </p>
    //     </VerticalTimelineElement>
    //   )
    // })


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
      <div  >
        <Timeline className="event-timeline" >
          {itineraryList}
        </Timeline>
      </div>
    );
  }
}

export default TripEventTimeline;
