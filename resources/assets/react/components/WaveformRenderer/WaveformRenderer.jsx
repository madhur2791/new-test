import React from 'react';
import tinygradient from 'tinygradient';

class WaveformRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderWaveform = this.renderWaveform.bind(this);
  }

  renderWaveform(props) {
    const length = 50000;
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const center = [0, 300];
    const gradient = tinygradient([
        '#00ff00',
        '#9400D3'
    ]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(props.waveformData.data) {
        let xPoint = 0;
        const maxValue = Math.max.apply(null, props.waveformData.data.data.map(Math.abs));
        const dataPoints = props.waveformData.data.data;
        const length = dataPoints.length;
        console.log('length', length);
        ctx.moveTo(xPoint, center[1]);
        // const space = 1;
        const pointsCount = 900 / 0.5;
        console.log('pointsCount', pointsCount);
        const colors = gradient.rgb(pointsCount);
        const sampleRate = Math.ceil(length / pointsCount);
        // console.log(sampleRate);
        // for(let i=0; i<900; i+=6) {
        //     ctx.beginPath();
        //     ctx.moveTo(i, center[1]);
        //     ctx.lineTo(i, center[1] + i);
        //     ctx.lineWidth=2;
        //     ctx.stroke();
        // }
        const samplingRate = this.props.sampleRate;
        let prevPoint = 0;
        let indexCount = 0;
        for(let i=0,colorIndex=0; i < pointsCount; i+=samplingRate*2, colorIndex+=1) {
            ctx.beginPath();
            ctx.strokeStyle=colors[colorIndex * samplingRate * 2];
            if(indexCount % 2 === 0) {

                // console.log();
                ctx.moveTo(xPoint, center[1] + (dataPoints[prevPoint+1]/maxValue) * 200);
                ctx.lineTo(xPoint+samplingRate, center[1] + (dataPoints[i]/maxValue) * 200);
                // ctx.moveTo(xPoint, center[1] + (dataPoints[i]/maxValue) * 200);
                // ctx.lineTo(xPoint + samplingRate, center[1] + (dataPoints[i+1]/maxValue) * 200);
            } else {

                // console.log();
                ctx.moveTo(xPoint, center[1] + (dataPoints[prevPoint]/maxValue) * 200);
                ctx.lineTo(xPoint+samplingRate, center[1] + (dataPoints[i+1]/maxValue) * 200);
                // ctx.moveTo(xPoint, center[1] + (dataPoints[i]/maxValue) * 200);
                // ctx.lineTo(xPoint + samplingRate, center[1] + (dataPoints[i+1]/maxValue) * 200);
            }
            ctx.lineWidth=1;
            ctx.stroke();
            indexCount+=1;
            // ctx.moveTo(xPoint, center[1]);
            // ctx.lineTo(xPoint, center[1] + (dataPoints[i]/maxValue) * 300);

            // ctx.moveTo(xPoint, center[1]);
            // ctx.lineTo(xPoint, center[1] + (dataPoints[i+1]/maxValue) * 300);
            // console.log(dataPoints[i]/maxValue, dataPoints[i+1]/maxValue);

            xPoint += samplingRate;
            prevPoint = i;
        }
    }
  }

  componentWillReceiveProps(props) {
    console.log('props received');
    this.renderWaveform(props);
  }

  componentDidMount() {
      console.log('mount', this.props);
      this.renderWaveform(this.props);
  }

  render() {
    return(
        <canvas ref="canvas" width={900} height={600} />
    )
  }
}



export default WaveformRenderer;
