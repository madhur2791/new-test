import React from 'react';

class WaveformRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    const length = 50000;
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const center = [0, 300];
    if(props.waveformData[props.mediaId].data.data) {
        let xPoint = 0;
        const maxValue = Math.max.apply(null, props.waveformData[props.mediaId].data.data.map(Math.abs));
        const dataPoints = props.waveformData[props.mediaId].data.data;
        const length = dataPoints.length;
        ctx.moveTo(xPoint, center[1]);
        for(let i=0; i< length; i+=5) {
            xPoint += 10;
            ctx.beginPath();
            console.log((dataPoints[i]/maxValue), (dataPoints[i+5]/maxValue))
            ctx.moveTo(xPoint, center[1] + (dataPoints[i]/maxValue) * 30);
            ctx.lineTo(xPoint + 10, center[1] + (dataPoints[i+5]/maxValue) * 30);
            ctx.lineWidth=1;
            ctx.stroke();
        }
    }
  }

  componentDidMount() {
    // const canvas = this.refs.canvas
    // const ctx = canvas.getContext("2d");
    // const center = [0, 300];
    // for(let i=-50000; i < 50000; i = i+1) {
    //     ctx.beginPath();
    //     if (i%4 === 0) {
    //         ctx.moveTo(500+i,center[1]);
    //         ctx.lineTo(500+i,center[1] + i);
    //     } else {
    //         ctx.moveTo(500+i,center[1]);
    //         ctx.lineTo(500+i,center[1] - i);
    //     }

    //     ctx.lineWidth=1;
    //     ctx.strokeStyle = `#${Math.abs(i*3)}`

    //     ctx.stroke();

    // }

  }


  render() {
    return(
    <canvas ref="canvas" width={800} height={600} />
    )
  }
}



export default WaveformRenderer;
