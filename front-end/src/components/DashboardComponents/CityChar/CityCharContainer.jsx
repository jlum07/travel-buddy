import React, { Component } from "react";
import { TweenMax, Elastic } from "gsap/all";

class CityCharContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      fields: []
    };
  }

  _drawGraph() {
    let sides = 5;
    let canvasSize = 500;
    let padding = 50;

    let data = [];
    let fields = [];
    console.log(this.props);

    for (let char in this.props.CityChar) {
      data.push(this.props.CityChar[char] * 10);
      fields.push(char);
    }

    console.log(data, fields);

    // letiable
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    let centerX = canvasSize / 2;
    let centerY = canvasSize / 2;
    let shapesArray = [];
    let dataArray = [];
    let radius = canvasSize / 2 - padding;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Prototypes
    let Shape = function() {};
    Shape.pt = Shape.prototype;

    let Point = function() {};
    Point.pt = Point.prototype;

    // Functions
    function loop() {
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      for (let j = 0; j < shapesArray.length; j++) {
        let shape = shapesArray[j];
        ctx.beginPath();
        ctx.lineTo(shape.points[0].x, shape.points[0].y);

        for (let i = 0; i < shape.points.length; i++) {
          ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }

        ctx.fillStyle = shape.fill;
        ctx.strokeStyle = shape.stroke;
        ctx.lineWidth = shape.linewidth;

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      if (shapesArray[0]) {
        for (let i = 0; i < shapesArray[0].points.length; i++) {
          ctx.strokeStyle = "#208963";
          ctx.lineWidth = 1;
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(shapesArray[0].points[i].x, shapesArray[0].points[i].y);
          ctx.stroke();
        }
      }

      for (let j = 0; j < dataArray.length; j++) {
        let shape = dataArray[j];
        ctx.beginPath();
        ctx.lineTo(shape.points[0].x, shape.points[0].y);

        for (let i = 0; i < shape.points.length; i++) {
          ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }

        ctx.fillStyle = shape.fill;
        ctx.strokeStyle = shape.stroke;
        ctx.lineWidth = shape.linewidth;

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        shape = dataArray[j];
        ctx.textBaseline = "middle";
        for (let i = 0; i < shape.fields.length; i++) {
          let _x = Math.round(shape.fields[i].x);
          if (_x < centerX) {
            ctx.textAlign = "right";
          } else if (_x > centerX) {
            ctx.textAlign = "left";
          } else if (_x == centerX) {
            ctx.textAlign = "center";
          }
          ctx.fillText(fields[i], shape.fields[i].x, shape.fields[i].y);
        }
      }
    }

    let timer = setInterval(loop, 1000 / 60);

    function setupShape(_sides, _radius, _fill, _stroke, _linewidth) {
      let shape = new Shape();
      shape.sides = _sides;
      shape.radius = _radius;
      shape.fill = _fill;
      shape.stroke = _stroke;
      shape.linewidth = _linewidth;
      shape.points = [];

      for (let i = 0; i < _sides; i++) {
        let p = new Point();
        let ang = (Math.PI / (_sides / 2)) * i;
        let sang = Math.sin(ang);
        let cang = Math.cos(ang);
        p.x = centerX + sang * _radius;
        p.y = centerY + cang * _radius;
        shape.points.push(p);
      }

      shapesArray.push(shape);
    }

    function setupData(_data, _fill, _stroke, _linewidth) {
      let shape = new Shape();
      let length = data.length;
      shape.sides = length;
      shape.fill = _fill;
      shape.stroke = _stroke;
      shape.linewidth = _linewidth;
      shape.points = [];
      shape.fields = [];

      for (let i = 0; i < length; i++) {
        let p = new Point();
        let ang = (Math.PI / (length / 2)) * i;
        let sang = Math.sin(ang);
        let cang = Math.cos(ang);
        p.x = centerX + sang * ((data[i] / 100) * radius);
        p.y = centerY + cang * ((data[i] / 100) * radius);
        shape.points.push(p);

        p = new Point();
        ang = (Math.PI / (length / 2)) * i;
        sang = Math.sin(ang);
        cang = Math.cos(ang);
        p.x = centerX + sang * (radius + 20);
        p.y = centerY + cang * (radius + 20);
        shape.fields.push(p);
      }

      dataArray.push(shape);
      for (let i = 0; i < shape.points.length; i++) {
        TweenMax.from(shape.points[i], Math.random() * 0.75 + 0.25, {
          x: canvasSize / 2,
          y: canvasSize / 2,
          delay: 1.2
        });
      }
    }

    function play() {
      setupShape(sides, radius, "#175f45", "#3ad59c", 3);
      setupShape(sides, (radius * 3) / 4, "#2e6f58", "#208963", 1);
      setupShape(sides, radius / 2, "#437e69", "#208963", 1);
      setupShape(sides, (radius * 1) / 4, "#1f8862", "#208963", 1);

      for (let j = 0; j < shapesArray.length; j++) {
        let shape = shapesArray[j];
        for (let i = 0; i < shape.points.length; i++) {
          TweenMax.from(shape.points[i], Math.random() * 0.75 + 1, {
            x: canvasSize / 2,
            y: canvasSize / 2,
            ease: Elastic.easeOut
          });
        }
      }

      setupData(data, "rgba(99, 223, 178, 0.5)", "#3ad59c", 2);
    }

    play();
  }

  componentDidMount() {

    document.getElementById("CityCharContainer").appendChild(this.refs.canvas);
    this._drawGraph()

  }

  componentDidUpdate(){
    this._drawGraph()
    console.log("props", this.props)
  }

  render() {
    return <canvas ref="canvas" width={640} height={425} />;
  }
}

export default CityCharContainer;
