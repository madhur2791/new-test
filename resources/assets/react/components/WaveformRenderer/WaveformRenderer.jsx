import React from 'react';
import tinygradient from 'tinygradient';

const computeColor = (colorOption, colors, dataPointsCount, diffusionPercentage = 0) => {
    const colorObject = {
        length: colors.length,
        colors: colors
    };

    if (colorOption === 'mix') {
        colorObject.divisionFactor = 1 / colors.length;
        return colorObject;
    }

    const computedColors = [];
    const individualColorLength = Math.round(dataPointsCount / colors.length);

    for (let colorIndex = 0; colorIndex < colors.length; colorIndex += 1) {
        const diffusedColorLength = Math.round(individualColorLength * diffusionPercentage / 100);
        const flatColorLength = individualColorLength - diffusedColorLength;


        if(colorIndex < colors.length - 1) {
            computedColors.push(...(new Array(flatColorLength).fill(colors[colorIndex])));
            const gradient = tinygradient([
                colors[colorIndex],
                colors[colorIndex + 1]
            ]);

            if(diffusedColorLength > 2) {
                computedColors.push(...gradient.rgb(diffusedColorLength));
            } else {
                computedColors.push(...(new Array(diffusedColorLength).fill(colors[colorIndex])));
            }

        } else {
            computedColors.push(...(new Array(flatColorLength + diffusedColorLength).fill(colors[colorIndex])));
        }

    }
    colorObject.computedColors = computedColors;
    return colorObject;
};

const processData = (rawDataPoints, samplingRate) => {
    console.log(samplingRate);
    const processedData = {};
    processedData.reSampledDataPoints = [];
    processedData.maxValue = 0;
    for (let index = 0; index < rawDataPoints.length; index += samplingRate) {
        const sample = rawDataPoints[Math.round(index)] && Math.abs(rawDataPoints[Math.round(index)]) || 0;
        if(sample > processedData.maxValue) {
            processedData.maxValue = sample;
        }
        processedData.reSampledDataPoints.push(sample);
    }
    return processedData;
};

class WaveformRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderWaveform = this.renderWaveform.bind(this);
  }

  renderWaveform(props) {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const centerY = Math.ceil(this.props.height / 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(props.waveformData.data) {
        if(this.props.waveformType === 'radial') {

        } else if(this.props.waveformType === 'linear') {
            const { lineWidth, lineSpacing, lineDashWidth } = this.props;
            let pointX = 0;
            const { reSampledDataPoints, maxValue }  = processData(
                props.waveformData.data.data,
                (
                    props.waveformData.data.data.length /
                    (this.props.width / (lineWidth + lineSpacing)) * 2
                )
            );
            const amplificationFactor = this.props.height * 1 / 3;

            ctx.moveTo(pointX, centerY);

            const computedColors = computeColor(
                this.props.colorOption,
                this.props.colorPallet.colors,
                reSampledDataPoints.length,
                this.props.colorDiffusionPercentage
            );

            let prevPoint = 0;
            ctx.lineJoin = ctx.lineCap = 'round';

            for(let xPoint=0; xPoint < reSampledDataPoints.length; xPoint+=1) {
                ctx.beginPath();
                const absValue = Math.abs(reSampledDataPoints[xPoint] / maxValue);
                const amplifiedValue = absValue * amplificationFactor;

                if(this.props.colorOption === 'mix') {
                    ctx.strokeStyle = `#${computedColors.colors[
                        Math.floor(absValue / computedColors.divisionFactor)
                    ]}`;
                } else {
                    if(typeof computedColors.computedColors[xPoint] === 'object') {
                        ctx.strokeStyle = computedColors.computedColors[xPoint];
                    } else {
                        ctx.strokeStyle = `#${computedColors.computedColors[xPoint]}`;
                    }
                }

                ctx.moveTo(((xPoint - 0.5) * (this.props.width / reSampledDataPoints.length)), centerY - prevPoint);
                ctx.lineTo(xPoint * (this.props.width / reSampledDataPoints.length), centerY + amplifiedValue);
                ctx.moveTo(xPoint * (this.props.width / reSampledDataPoints.length), centerY + amplifiedValue);
                ctx.lineTo((xPoint + 0.5) * (this.props.width / reSampledDataPoints.length), centerY - amplifiedValue);
                ctx.lineWidth = lineWidth;
                ctx.stroke();

                prevPoint = amplifiedValue;
            }
        } else {
            const { lineWidth, lineSpacing, lineDashWidth } = this.props;

            const { reSampledDataPoints, maxValue }  = processData(
                props.waveformData.data.data,
                (
                    props.waveformData.data.data.length /
                    (this.props.width / (lineWidth + lineSpacing))
                )
            );

            let pointX = 0;

            const amplificationFactor = this.props.height * 1 / 3;
            ctx.moveTo(pointX, centerY);

            const computedColors = computeColor(
                this.props.colorOption,
                this.props.colorPallet.colors,
                reSampledDataPoints.length,
                this.props.colorDiffusionPercentage
            );

            for(let xPoint=0; xPoint < reSampledDataPoints.length; xPoint+=1) {
                ctx.beginPath();
                const absValue = Math.abs(reSampledDataPoints[xPoint] / maxValue);
                const amplifiedValue = absValue * amplificationFactor;

                if(this.props.colorOption === 'mix') {
                    ctx.strokeStyle = `#${computedColors.colors[
                        Math.floor(absValue / computedColors.divisionFactor)
                    ]}`;
                } else {
                    if(typeof computedColors.computedColors[xPoint] === 'object') {
                        ctx.strokeStyle = computedColors.computedColors[xPoint];
                    } else {
                        ctx.strokeStyle = `#${computedColors.computedColors[xPoint]}`;
                    }
                }
                ctx.setLineDash([lineDashWidth]);
                ctx.moveTo(xPoint * (this.props.width / reSampledDataPoints.length), centerY + (lineDashWidth / 2));
                ctx.lineTo(xPoint * (this.props.width / reSampledDataPoints.length), centerY - amplifiedValue);
                ctx.moveTo(xPoint * (this.props.width / reSampledDataPoints.length) , centerY - (lineDashWidth / 2));
                ctx.lineTo(xPoint * (this.props.width / reSampledDataPoints.length), centerY + amplifiedValue);
                ctx.lineWidth=lineWidth;
                ctx.stroke();
            }
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
        <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    )
  }
}



export default WaveformRenderer;
