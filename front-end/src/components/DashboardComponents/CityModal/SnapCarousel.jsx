import React from 'react';
import { Carousel } from 'react-bootstrap'
import './SnapCarousel.css';

class SnapCarousel extends React.Component {

  render(){

    const carouselItems = snapchat.map((snap) => {
      return (
        <Carousel.Item className="vid-container">
          <video controls muted loop autoPlay>
            <source src={snap} type="video/mp4" />
          </video>
        </Carousel.Item>
      )
    })

    return (
      <Carousel>
        {carouselItems}
      </Carousel>
    );
  }
}

export default SnapCarousel;

const snapchat = [
  'https://s.sc-jpl.com/I51DEAm1QXvSDC4GBUeQfJczqQWcs1PbWPLeip9yPkw=/default/media.mp4',
  'https://s.sc-jpl.com/kA05tCnBWQ8qvalaD9IcAuO-nReqrp-x_YPDU_opbLI=/default/media.mp4',
  'https://s.sc-jpl.com/4nGAnoUvi6SNEl0JgQyy-90aqcF-bGzKrVu5lcFIJGI=/default/media.mp4',
  'https://s.sc-jpl.com/d1cqlt259fkO3vwaMqVVZDnwPwczEp-KOHRWJsDNA14=/default/media.mp4',
  'https://s.sc-jpl.com/K7g-1coV_-ts2d0bdGTDPsju6otdBpTPzC30wZgdirg=/default/media.mp4',
  'https://s.sc-jpl.com/VKTAW_7r3GfZ5buiTwrHIoxgVU0IMssxugIuU-sxDBw=/default/media.mp4',
  'https://s.sc-jpl.com/PfuMS-gmOWcbO1NIpnUQVTC49aazBkturSAm8aUjdL0=/default/media.mp4',
  'https://s.sc-jpl.com/hXfOmNNNR_2Paexk1qz5vNNZg7asbNWk4Rhe9Gz5L74=/default/media.mp4',
  'https://s.sc-jpl.com/_H0JsE7zzmXxSKdMUOQHsNlT549lSrm532ZRb9hcjyA=/default/media.mp4',
  'https://s.sc-jpl.com/Z_vq_aCDhKrSJ9YFxxSJ84HMVocZIL0lQbO0p4D9bQ8=/default/media.mp4' ]