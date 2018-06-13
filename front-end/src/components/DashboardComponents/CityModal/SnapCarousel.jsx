import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import snapLogo from './Snapchat-Sad.png';
import './SnapCarousel.css';

class SnapCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleCarouselSlide = this.handleCarouselSlide.bind(this);

    this.state = {
      index: 0
    };
  }


  handleCarouselSlide(selectedIndex, event) {
    this.setState({
      index: selectedIndex
    });
    var videos = document.getElementsByClassName('snap-video');
    for (let i = 0; i < videos.length; i++){
      if (i !== selectedIndex){
        videos[i].pause();
      } else{
        videos[i].play();
      }
    }
  }

  componentWillReceiveProps(nextProps){
    var videos = document.getElementsByClassName('snap-video');
    if (nextProps.playSnaps){
      videos[0].play();
    }
  }

  render(){
    const { index } = this.state;
    let carouselItems = <Carousel.Item className="vid-container"/>


    if (this.props.snapchats[0] === "No Snaps!"){
      return (
        <div>
          <h2 className='title' >No Snaps for this pin</h2>
          <img id='sad-snapchat' src={snapLogo} />
        </div>
        );
    }
    else {
      carouselItems = this.props.snapchats.map((snap, index) => {
        return (
          <Carousel.Item className="vid-container" key={index}>
            <video controls className='snap-video'>
              <source src={snap} type="video/mp4" />
            </video>
          </Carousel.Item>
        )
      });

      return (
          <Carousel
            id='snap-carousel'
            activeIndex={index}
            onSelect={this.handleCarouselSlide} >
            {carouselItems}
          </Carousel>
      );
    }




  }
}

export default SnapCarousel;

// //const snapchat = [
//   'https://s.sc-jpl.com/I51DEAm1QXvSDC4GBUeQfJczqQWcs1PbWPLeip9yPkw=/default/media.mp4',
//   'https://s.sc-jpl.com/kA05tCnBWQ8qvalaD9IcAuO-nReqrp-x_YPDU_opbLI=/default/media.mp4',
//   'https://s.sc-jpl.com/4nGAnoUvi6SNEl0JgQyy-90aqcF-bGzKrVu5lcFIJGI=/default/media.mp4',
//   'https://s.sc-jpl.com/d1cqlt259fkO3vwaMqVVZDnwPwczEp-KOHRWJsDNA14=/default/media.mp4',
//   'https://s.sc-jpl.com/K7g-1coV_-ts2d0bdGTDPsju6otdBpTPzC30wZgdirg=/default/media.mp4',
//   'https://s.sc-jpl.com/VKTAW_7r3GfZ5buiTwrHIoxgVU0IMssxugIuU-sxDBw=/default/media.mp4',
//   'https://s.sc-jpl.com/PfuMS-gmOWcbO1NIpnUQVTC49aazBkturSAm8aUjdL0=/default/media.mp4',
//   'https://s.sc-jpl.com/hXfOmNNNR_2Paexk1qz5vNNZg7asbNWk4Rhe9Gz5L74=/default/media.mp4',
//   'https://s.sc-jpl.com/_H0JsE7zzmXxSKdMUOQHsNlT549lSrm532ZRb9hcjyA=/default/media.mp4',
//   'https://s.sc-jpl.com/Z_vq_aCDhKrSJ9YFxxSJ84HMVocZIL0lQbO0p4D9bQ8=/default/media.mp4' ]