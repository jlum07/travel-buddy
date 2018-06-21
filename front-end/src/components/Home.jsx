import React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, Col, Row, Grid, Alert } from 'react-bootstrap';
// import { Input } from 'mdbreact';
// import 'mdbreact/dist/css/mdb.css';
import { Redirect, Link } from 'react-router-dom';
import { Parallax, Background } from 'react-parallax';
import axios from 'axios';
import './Home.css';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchCity: null,
      redirectToCity: false,
      searchError: false
    };
    this.handleSearchCityChange = this.handleSearchCityChange.bind(this);
    this.searchCity = this.searchCity.bind(this);
    this.takeMeAnyWhere = this.takeMeAnyWhere.bind(this);
    this.enterListener = this.enterListener.bind(this);
  }

  takeMeAnyWhere(){
    let randomIndex = Math.floor(Math.random()*5+1);
    let randonCityList = ['Toronto', 'Barcelona', 'Bangkok', 'Munich', 'Paris']
    this.setState({
      searchCity: randonCityList[randomIndex],
      redirectToCity: true
    });
  }

  searchCity(){
    axios.get(`https://travel-buddy2.herokuapp.com/city/autocorrect/${this.state.searchCity}`)
    .then((response)=>{
      // console.log('response = ', response);
      if (response.status === 204){
        // console.log('City Not Found');
        this.setState({searchError: true})
      } else {
        this.setState({
          searchCity: response.data,
          redirectToCity: true,
          searchError: true
          });
      }
    })
    .catch((error)=>{console.log(error);})
  }

  handleSearchCityChange(event){
    this.setState({
      searchCity: event.target.value
    });
  }

  enterListener(event){
    if (event.key === 'Enter'){
      this.searchCity();
    }
  }

  render(){
    var searchError = this.state.searchError?
      (<Alert bsStyle="danger">{this.state.searchCity} Not Found</Alert>) : (null);


    if (this.state.redirectToCity){
      return(<Redirect to={`/cities/${this.state.searchCity}`}/>)
    }

    return (
      <React.Fragment>
        <Parallax
        bgImage="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec23000300013938b7094a2e14398585&auto=format&fit=crop&w=1950&q=80"
        strength={500}>
          <div className="parallax-outter" >
            <div className="parallax-inner">
              <div id="hero-text">Start Your Adventure Here</div>
              {searchError}
              <FormGroup controlId="formBasicText">
                <FormControl
                  id="city-search-box"
                  bsSize="large"
                  type="text"
                  placeholder="Enter a city..."
                  onChange={this.handleSearchCityChange}
                  onKeyUp={this.enterListener}
                />
              </FormGroup>
              <div id="search-button-container">
                <Button id='search-city-button' bsSize="large" onClick={this.searchCity} >Search</Button>
                <Button id="search-anywhere-button" bsSize="large" bsStyle="primary" onClick={this.takeMeAnyWhere} >Take me anywhere!</Button>
              </div>
            </div>
          </div>
        </Parallax>
        <div className="parallax-break">| | |</div>
        <Parallax
        bgImage="https://images.unsplash.com/photo-1441071976244-9d5b90825a80?ixlib=rb-0.3.5&s=bb1c56428e017132290678bdbb09f103&auto=format&fit=crop&w=1951&q=80"
        strength={500}>
          <div className="parallax-city" >
            <div className="parallax-inner">
              <div id="hero-city"><Link className="parallax-link" to="/cities/Toronto#section1">TORONTO</Link></div>
            </div>
          </div>
        </Parallax>
        <div className="parallax-break">| | |</div>
        <Parallax
        bgImage="https://images.unsplash.com/photo-1452796651103-7c07fca7a2c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a157592b76ab91d277cae6d38e34ddd1&auto=format&fit=crop&w=967&q=80"
        strength={500}>
          <div className="parallax-city" >
            <div className="parallax-inner">
              <div id="hero-city"><Link className="parallax-link" to="/cities/New%20York">NEW YORK</Link></div>
            </div>
          </div>
        </Parallax>
        <div className="parallax-break">| | |</div>
        <Parallax
        bgImage="https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=636b63868b175036ffcd49877df723e9&auto=format&fit=crop&w=1950&q=80"
        strength={500}>
          <div className="parallax-city" >
            <div className="parallax-inner">
              <div id="hero-city"><Link className="parallax-link" to="/cities/Tokyo">TOKYO</Link></div>
            </div>
          </div>
        </Parallax>
      </React.Fragment>
    )
  }
}

export default Home;



    // return (
    //   <Grid>
    //     <Jumbotron>
    //       <h2>Search a city:</h2>
    //       {searchError}
    //       <Row>
    //         <Col md={10}>
    //           <FormGroup
    //             controlId="formBasicText"
    //           >
    //             <FormControl
    //               type="text"
    //               placeholder="Enter a city..."
    //               onChange={this.handleSearchCityChange}
    //               onKeyUp={this.enterListener}
    //             />
    //           </FormGroup>
    //         </Col>
    //         <Col md={2}>
    //           <Button id='search_city_button' onClick={this.searchCity} >Search</Button>
    //         </Col>
    //       </Row>
    //       <Button bsStyle="primary" bsSize="large" block onClick={this.takeMeAnyWhere} >
    //         Take me anywhere!
    //       </Button>
    //     </Jumbotron>
    //   </Grid>
    //   )