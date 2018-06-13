import React, { Component } from "react";
import "./CityPercentageContainer.css"
import Snap, { mina } from "snapsvg"


class CityCharContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      fields: []
    };
  }

  _drawGraph() {
    let canvasSize = 200
      let centre = canvasSize / 2
      let radius = (canvasSize * 0.8) / 2
      let s = Snap("#svg")
      let path = ""
      let arc = s.path(path)
      let startY = centre - radius
      let runBtn = document.getElementById("run")
      let percDiv = document.getElementById("percent")
      let input = document.getElementById("input")

    input.onkeyup = function(evt) {
      if (isNaN(input.value)) {
        input.value = "";
      }
    };

    runBtn.onclick = function() {
      run(input.value / 100);
    };

    function run(percent) {
      var endpoint = percent * 360;
      Snap.animate(
        0,
        endpoint,
        function(val) {
          arc.remove();

          let d = val
          let dr = d - 90;
          let radians = (Math.PI * dr) / 180
          let endx = centre + radius * Math.cos(radians)
          let endy = centre + radius * Math.sin(radians)
          let largeArc = d > 180 ? 1 : 0
          path =
            "M" +
            centre +
            "," +
            startY +
            " A" +
            radius +
            "," +
            radius +
            " 0 " +
            largeArc +
            ",1 " +
            endx +
            "," +
            endy;

          arc = s.path(path);
          arc.attr({
            stroke: "#3da08d",
            fill: "none",
            strokeWidth: 12
          });
          percDiv.innerHTML = Math.round((val / 360) * 100) + "%";
        },
        2000,
        mina.easeinout
      );
    }

    run(input.value / 100);
  }

  componentDidMount() {
    document.getElementById("CityCharContainer").appendChild(this.refs.canvas);
    this._drawGraph();
  }

  componentDidUpdate() {
    // this._drawGraph()
    console.log("props", this.props);
  }

  render() {
    return (
      <div class="container">
        <div id="percent" />
        <svg id="svg" />
        <p>
          <label for="perc-input">Percent:</label>
          <input maxlength="2" type="text" id="input" value="65" />
        </p>
        <a class="btn" id="run">
          Run
        </a>
      </div>
    );
  }
}

export default CityCharContainer;
