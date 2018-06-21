import React from "react";
import { Carousel } from "react-bootstrap";
import getInstagrams from "./getInstagrams";
import instaLogo from './InstaLogo.png';
import './InstaCarousel.css';

class InstaCarousel extends React.Component {
  constructor() {
    super();

    this.state = {
      instas: []
    };
  }
  componentDidMount() {
    getInstagrams(
      this.props.currentPin.location.lat,
      this.props.currentPin.location.lng
    ).then(instas => {
      console.log("bruhhfjdhsfjkdhsk", instas);
      this.props.hasInstas(instas)
      this.setState({ instas: instas });
    })
    .catch((error)=>{
      console.log('Error running the function getInstagrams: ', error);
    })
  }
  render() {
    if (this.state.instas.length === 0){
      return (
        <React.Fragment>
          <h2>Loading Instas...</h2>
          <img id='insta-logo' src={instaLogo} />
        </React.Fragment>


        );
    }
    else {
      const carouselItems = this.state.instas.map((node, index) => {
        if (index !== 0) {
          return (
            <Carousel.Item key={index}>
              {(node.demensions && <img
                width={node.demensions.width}
                height={node.demensions.width}
                alt=""
                src={node.url}
              /> )}
              <Carousel.Caption>
                <p>{node.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        }
      });

      return <Carousel>{carouselItems}</Carousel>;
    }

  }
}

export default InstaCarousel;

const instagram = [
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/a87a3062621ba24a27d64d850a0aeaf0/5BBBF08D/t51.2885-15/e35/33110057_531933480533810_6811870981028577280_n.jpg",
    text:
      "MEET N GREET @ THE ROOTS STORE TMRW. EATON CENTRE... 4:30 - 6:00 ‼️‼️‼️‼️‼️‼️",
    timestamp: 1527733721,
    demensions: {
      height: 1080,
      width: 1080
    }
  },
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/f46babdf12b96771fa949378e997afb2/5BA6457F/t51.2885-15/e35/33325015_212302279498231_142758442266787840_n.jpg",
    text:
      "Tag someone below that remembers the shrubbery in Eaton Centre.  #oldtoronto #toronto #history",
    timestamp: 1528084431,
    demensions: {
      height: 1350,
      width: 1080
    }
  },
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/785a52c45cfd38208ee7374a5c3fc974/5BBD338B/t51.2885-15/e35/34185671_606268309740645_962785325342523392_n.jpg",
    text: "I thought I was cute 😂😂clearly I’m not",
    timestamp: 1528070859,
    demensions: {
      height: 1350,
      width: 1080
    }
  },
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/4227a7375eef70ee9a8d21e6162472af/5B9E4196/t51.2885-15/e35/32937636_1994079053970846_6306087300015063040_n.jpg",
    text: "Turban up Day👳",
    timestamp: 1528071733,
    demensions: {
      height: 1080,
      width: 1080
    }
  },
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/638be1330f6427a86382766016ba4d62/5BA5BF12/t51.2885-15/e35/33878709_2037251996526976_2761361463896440832_n.jpg",
    text: "Wardrobe @krystalclearapparel @krystal_clear_images",
    timestamp: 1528064942,
    demensions: {
      height: 1349,
      width: 1080
    }
  },
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/608f1928a1435779059ffb455dc31624/5BBFAE0D/t51.2885-15/e35/33066599_234775267256542_6377135340515229696_n.jpg",
    text: "@killy x @rootscanada \nrecap video out",
    timestamp: 1527808874,
    demensions: {
      height: 1350,
      width: 1080
    }
  },
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/8f17e6fb561f36eda6cded6acf25efb2/5BBAF452/t51.2885-15/e35/33559619_2186883774874357_2309612663354687488_n.jpg",
    text: "Had to kill time after meeting Killy 👽",
    timestamp: 1528068333,
    demensions: {
      height: 1080,
      width: 1080
    }
  },
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/fc21c6f477789091a75f526a6bb798e2/5BB0AB42/t51.2885-15/e35/33210152_310406966163183_2106052684065800192_n.jpg",
    text:
      "Swipe left to see my training videos from 3 years ago!\nThese were from when I first started weight lifting and had no idea what I was doing at gym. I still went regularly though. Legs were so skinny comparing to now 👀\n-\nFit white girls with big ass used to be my goals and motivations but now I just want to stay asian with big ass and heart. Let’s see how big they can go.\n-\n往左滑去看我三年前的健身影片！那時剛開始接觸健身，雖然毫無頭續怎麼練，但跟朋友還是會固定去健身房亂練🤣🤣🤣\n一開始我的目標和動力是大屁股白人，但現在我的目標是我自己，亞洲人加大屁股⋯⋯讓我們繼續看下去亞洲女性到底可以多大\n#ghostfromtaiwan #memories #kimkbooty #asianswag #lollipop #leopardprint #UO #Zara",
    timestamp: 1527866760,
    demensions: {
      height: 1350,
      width: 1080
    }
  },
  {
    url:
      "https://scontent-yyz1-1.cdninstagram.com/vp/1e6089406f561513b0b6fa5c07036279/5BADCAB3/t51.2885-15/e35/32872499_1248217691975737_8492557989658492928_n.jpg",
    text:
      "Stargirl 🌠\n.\n.\n.\n.\n.\n#toronto #canonphotography #toronto_insta #rain #thankyoutoronto #blogto #6ixwalks #streetmobs #visualtoronto #torontoclx #toptorontophoto #curiocityto #streetsoftoronto #6ixgrams #torontosworld #gameofthrones #urbanandstreets #citykillerz #lovetoronto #naturephotography #streetshared #torbucketlist #visualizetoronto #torontoforyou #city #moodygrams #inside_TO #streetphotography #naturelovers #inspiredbytoronto",
    timestamp: 1528056876,
    demensions: {
      height: 1350,
      width: 1080
    }
  }
];
