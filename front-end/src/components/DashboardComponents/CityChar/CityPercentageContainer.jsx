import React, { Component } from "react";
import "./CityPercentageContainer.css";
import { Alert } from "react-bootstrap";
import axios from 'axios'

class CityPercentageContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      rank_food: '',
          rank_arts: '',
          rank_nightlife: '',
          rank_safety: '',
          rank_price: ''
    }
  }

  componentDidMount(){

    let session_token = localStorage.getItem('session_token');
    // console.log('session_token = ', session_token);

    axios.get('http://localhost:3001/users/profile_data', {
      headers: {
        session_token: session_token
      }
    })
    .then((response)=>{

      // console.log('response.data = ', response.data);
      // console.log('this.state = ', this.state);
      this.setState({

          rank_food: response.data.food_rank,
          rank_arts: response.data.arts_rank,
          rank_nightlife: response.data.nightlife_rank,
          rank_safety: response.data.safety_rank,
          rank_price: response.data.price_rank

      })
    })
  }

  render() {

    let hi ={
      boxShadow: "inset 0 0 0px 60px #b2dba1"
    }

    // console.log("citychar", this.props.CityChar)

    let food = (this.state.rank_food * this.props.CityChar.food) / 10
    let arts = (this.state.rank_arts * this.props.CityChar.culture) / 10
    let nightlife = (this.state.rank_nightlife * this.props.CityChar.nightlife) / 10
    let safety = (this.state.rank_safety * this.props.CityChar.safety) / 10
    let price = (this.state.rank_price * this.props.CityChar.cost) / 10

    console.log(this.state)
    let sum = this.state.rank_food + this.state.rank_arts+this.state.rank_nightlife +this.state.rank_safety +this.state.rank_price
    console.log(sum)
    let eqn = (food + arts + nightlife + safety + price)/sum
    console.log(eqn)
    let eqnRound = String(Math.ceil(eqn*100/5)*5)
    console.log(typeof(eqnRound))

    let result = ''
    let message = ''
    if(eqnRound > 80){
      result = 'success'
      message = 'Good Match!'
    } else if(eqnRound > 60){
      result = 'warning'
      message = 'Ok Match!'
    } else {
      result = 'danger'
      message = 'Bad Match!'
    }


    if (this.props.currentUser.id){
      return (
        <div id="result-container">
          <Alert bsStyle={result}>
            {this.props.currentUser.username}: {message}
          </Alert>
          <div class="chart" data-percentage={`${eqnRound}`}>
            <div class="percentage" />
            <div class="completed active" />
          </div>
        </div>
      );      
    } else {
      return null
    }
  }
}

export default CityPercentageContainer;
