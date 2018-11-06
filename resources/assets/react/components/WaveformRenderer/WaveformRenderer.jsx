import React from 'react';
import tinygradient from 'tinygradient';
import qrcode from 'qrcode-generator';

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
    const normalizedDiffusion = diffusionPercentage / 100;
    let flatColorLength = Math.ceil(dataPointsCount * (1 - normalizedDiffusion) / colors.length);
    let diffusedColorLength = Math.ceil(dataPointsCount * normalizedDiffusion / (colors.length - 1));

    for (let colorIndex = 0; colorIndex < colors.length; colorIndex += 1) {

        computedColors.push(...(new Array(flatColorLength).fill(colors[colorIndex])));
        if(colorIndex < colors.length - 1) {
            const gradient = tinygradient([
                colors[colorIndex],
                colors[colorIndex + 1]
            ]);
            if(diffusedColorLength > 2) {
                computedColors.push(...gradient.rgb(diffusedColorLength));
            } else {
                computedColors.push(...(new Array(diffusedColorLength).fill(colors[colorIndex])));
            }

        }

    }
    colorObject.computedColors = computedColors;
    return colorObject;
};

const fetchColor = (computedColors, xPoint, absValue = 1, colorOption = 'mix') => {
    let sampleColor = '#000';
    if (colorOption === 'mix') {
        sampleColor = `#${computedColors.colors[
            Math.floor(absValue / computedColors.divisionFactor)
        ]}`;
    } else {
        if(typeof computedColors.computedColors[xPoint] === 'object') {
            sampleColor = computedColors.computedColors[xPoint];
        } else {
            sampleColor = `#${computedColors.computedColors[xPoint]}`;
        }
    }

    return sampleColor;
}

const processData = (rawDataPoints, samplingRate) => {
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

const plotSoundWaveSample = (ctx, sampleData, waveType) => {
    if (waveType === 'linear') {
        ctx.beginPath();
        ctx.lineCap="round";
        ctx.strokeStyle = sampleData.color;
        ctx.moveTo(((sampleData.xPoint - 0.5) * (sampleData.sampleSpacing)), sampleData.centerY - sampleData.prevSample);
        ctx.lineTo(sampleData.xPoint * (sampleData.sampleSpacing), sampleData.centerY + sampleData.amplifiedValue);
        ctx.moveTo(sampleData.xPoint * (sampleData.sampleSpacing), sampleData.centerY + sampleData.amplifiedValue);
        ctx.lineTo((sampleData.xPoint + 0.5) * (sampleData.sampleSpacing), sampleData.centerY - sampleData.amplifiedValue);
        ctx.lineWidth = sampleData.lineWidth;
        ctx.stroke();
    } else if (waveType === 'bars') {
        ctx.beginPath();
        ctx.lineCap="round";
        ctx.strokeStyle = sampleData.color;

        ctx.moveTo(sampleData.xPoint * (sampleData.sampleSpacing), sampleData.centerY - sampleData.amplifiedValue);
        ctx.lineTo(sampleData.xPoint * (sampleData.sampleSpacing), sampleData.centerY + sampleData.amplifiedValue);
        ctx.lineWidth = sampleData.lineWidth;
        ctx.stroke();
    } else if (waveType === 'radial') {
        const currentAngle = sampleData.startAngle + ((sampleData.xPoint * 360) / sampleData.sampleLength);
        let nextAngle = sampleData.startAngle + (((sampleData.xPoint + 1) * 360) / sampleData.sampleLength);
        nextAngle = ((sampleData.lineWidth / (sampleData.lineWidth + sampleData.lineSpacing)) * (nextAngle - currentAngle)) + currentAngle;
        const currentRadAngle = currentAngle * Math.PI / 180;
        const nextRadAngle = nextAngle * Math.PI / 180;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.lineCap="square";
        ctx.fillStyle = sampleData.color;
        ctx.arc(sampleData.centerX, sampleData.centerY, sampleData.innerRadius,currentRadAngle,nextRadAngle);
        ctx.arc(sampleData.centerX, sampleData.centerY, sampleData.innerRadius + sampleData.amplifiedValue, nextRadAngle, currentRadAngle, true);
        ctx.fill();
        ctx.closePath();
    }
};

const plotWaveformGrid = (ctx, waveType, lineDashWidth, innerRadius, canvasDetails) => {
    if (waveType === 'linear' || waveType === 'bars') {
        const lineMaxWidth = 20;
        const numberOfLines = canvasDetails.height / 20;
        ctx.beginPath();
        ctx.lineCap="square";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = lineDashWidth;
        for (let i=0; i < numberOfLines / 2; i++) {
            ctx.moveTo(0, canvasDetails.centerY - (lineMaxWidth * i));
            ctx.lineTo(canvasDetails.width, canvasDetails.centerY - (lineMaxWidth * i));

            ctx.moveTo(0, canvasDetails.centerY + (lineMaxWidth * i));
            ctx.lineTo(canvasDetails.width, canvasDetails.centerY + (lineMaxWidth * i));
        }
        ctx.stroke();
    } else if (waveType === 'radial') {
        const lineMaxWidth = 20;
        const numberOfLines = (canvasDetails.height - innerRadius) / 20;

        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = lineDashWidth;

        for (let i = 0; i < numberOfLines; i++) {
            ctx.moveTo(
                canvasDetails.centerX + innerRadius + i * lineMaxWidth,
                canvasDetails.centerY
            );

            ctx.arc(
                canvasDetails.centerX,
                canvasDetails.centerY,
                innerRadius + i * lineMaxWidth,
                0,
                2 * Math.PI
            );
        }
        ctx.stroke();
    }
};


const renderQrCode = (ctx, qrCodeDetails, canvasDetails) => {
    var qr = qrcode(2, 'M');
    qr.addData(qrCodeDetails.qr_code_value);
    qr.make();
    const length = qr.getModuleCount();
    const cellSize = parseInt(qrCodeDetails.size, 10) / length;
    const position = {
        x: 20,
        y: 20
    };

    switch(qrCodeDetails.horizantal_alignment) {
        case 'left':
            position.x = 20;
        break;
        case 'right':
            position.x = canvasDetails.width - parseInt(qrCodeDetails.size, 10) - 20;
        break;
        case 'center':
            position.x = (canvasDetails.width / 2) - (parseInt(qrCodeDetails.size, 10) / 2);
        break;
    }

    switch(qrCodeDetails.vertical_alignment) {
        case 'top':
            position.y = 20;
        break;
        case 'bottom':
            position.y = canvasDetails.height - parseInt(qrCodeDetails.size, 10) - 20;
        break;
        case 'middle':
            position.y = (canvasDetails.height / 2) - (parseInt(qrCodeDetails.size, 10) / 2);
        break;
    }

    ctx.fillStyle = '#fff'
    ctx.fillRect(
        position.x - cellSize,
        position.y - cellSize,
        (length + 2) * cellSize,
        (length + 2) * cellSize,
    );

    for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
            ctx.fillStyle = qr.isDark(row, col) ? `#${qrCodeDetails.color}` : '#fff';
            ctx.fillRect(
                position.x + (row * cellSize),
                position.y + (col * cellSize),
                cellSize,
                cellSize
            );
        }
    }
};

const renderText = (ctx, textDetails, qrCodeDetails, canvasDetails) => {
    const position = {
        x: 20,
        y: 20
    };

    switch(textDetails.horizantal_alignment) {
        case 'left':
            position.x = 20;
        break;
        case 'right':
            position.x = canvasDetails.width - 20;
        break;
        case 'center':
            position.x = canvasDetails.width / 2;
        break;
    }

    switch(textDetails.vertical_alignment) {
        case 'top':
            position.y = 20;
        break;
        case 'bottom':
            position.y = canvasDetails.height - 20;
        break;
        case 'middle':
            position.y = canvasDetails.height / 2;
        break;
    }

    ctx.textAlign = textDetails.horizantal_alignment;
    ctx.textBaseline = textDetails.vertical_alignment;
    ctx.fillStyle = `#${textDetails.font_color}`
    ctx.font = `${textDetails.font_size}px ${textDetails.font_family}`;
    ctx.fillText(textDetails.text, position.x, position.y);
};

class WaveformRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderWaveform = this.renderWaveform.bind(this);
    }

    renderWaveform(props, generateAndStore = false) {
        const {
            canvasWidth,
            canvasHeight,
            qrCodeDetails,
            textDetails,
            wavefromColor,
            wavefromStyle
        } = props;
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if(props.waveformData.data) {
            let waveformType = wavefromStyle.waveform_type;
            let lineWidth = parseInt(wavefromStyle.line_width, 10);
            let lineSpacing = parseFloat(wavefromStyle.line_spacing);
            let lineDashWidth = parseInt(wavefromStyle.line_dash_width ,10);
            let innerRadius = parseInt(wavefromStyle.inner_radius, 10);
            let startAngle = parseInt(wavefromStyle.start_angle, 10);

            let lineWidthRange = [1, 40];
            let lineSpacingRange = [0, 40];
            let lineDashWidthRange = [0, 18];
            let innerRadiusRange = [0, 300];
            let startAngleRange = [0, 360];

            if (wavefromStyle.waveform_type === 'linear') {

            } else if (wavefromStyle.waveform_type === 'bars') {

            } else if (wavefromStyle.waveform_type === 'radial') {
                lineWidthRange = [0.1, 15];
                lineSpacingRange = [0, 2];
            }

            lineWidth = lineWidthRange[0] + (lineWidthRange[1] - lineWidthRange[0]) * lineWidth / 100;
            lineSpacing = lineSpacingRange[0] + (lineSpacingRange[1] - lineSpacingRange[0]) * lineSpacing / 100;
            lineDashWidth = lineDashWidthRange[0] + (lineDashWidthRange[1] - lineDashWidthRange[0]) * lineDashWidth / 100;
            innerRadius = innerRadiusRange[0] + (innerRadiusRange[1] - innerRadiusRange[0]) * innerRadius / 100;
            startAngle = startAngleRange[0] + (startAngleRange[1] - startAngleRange[0]) * startAngle / 100;

            const centerX = Math.ceil(canvasWidth / 2);
            const centerY = Math.ceil(canvasHeight / 2);
            const amplificationFactor = canvasHeight * 1 / 3;

            let samplingRate = 1;
            let samplingRateScale = 1;
            let graphSpan = canvasWidth;

            if(waveformType === 'radial') {
                graphSpan = 360;
                samplingRateScale = 1;
            } else if(waveformType === 'linear') {
                graphSpan = canvasWidth;
                samplingRateScale = 2;
            }

            samplingRate = (
                props.waveformData.data.data.length /
                (graphSpan / (lineWidth + lineSpacing)) * samplingRateScale
            );

            const { reSampledDataPoints, maxValue } = processData(
                props.waveformData.data.data,
                samplingRate
            );

            const computedColors = computeColor(
                wavefromColor.color_option,
                wavefromColor.colors,
                reSampledDataPoints.length,
                wavefromColor.color_diffusion_percentage
            );

            let prevSample = 0;
            for(let xPoint = 0; xPoint < reSampledDataPoints.length; xPoint+=1) {
                const absValue = Math.abs(reSampledDataPoints[xPoint] / maxValue);
                const amplifiedValue = absValue * amplificationFactor;
                const sampleColor = fetchColor(computedColors, xPoint, absValue, wavefromColor.color_option);

                plotSoundWaveSample(
                    ctx,
                    {
                        xPoint,
                        centerX,
                        centerY,
                        prevSample,
                        lineWidth,
                        lineSpacing,
                        amplifiedValue,
                        color: sampleColor,
                        sampleSpacing: canvasWidth / reSampledDataPoints.length,
                        sampleLength: reSampledDataPoints.length,
                        startAngle,
                        innerRadius
                    },
                    waveformType
                );
                prevSample = amplifiedValue;
            }

            if(lineDashWidth > 0) {
                plotWaveformGrid(ctx, waveformType, lineDashWidth, innerRadius, {
                    width: canvasWidth,
                    height: canvasHeight,
                    centerX,
                    centerY
                })
            }

            if (qrCodeDetails && qrCodeDetails.enabled === true && qrCodeDetails.qr_code_value) {
                renderQrCode(ctx, qrCodeDetails, {
                    width: canvasWidth,
                    height: canvasHeight
                });
            }

            if (textDetails && textDetails.text) {
                renderText(ctx, textDetails, qrCodeDetails, {
                    width: canvasWidth,
                    height: canvasHeight
                });
            }

            if (generateAndStore === true) {
                props.onImageDataGenerate(canvas.toDataURL('image/png'));
            }
        }
    }

    componentWillReceiveProps(props) {
        if(
            props.generateWaveformImage &&
            this.props.generateWaveformImage === false &&
            props.generateWaveformImage === true
        ) {
            this.renderWaveform(props, true);
        } else {
            this.renderWaveform(props);
        }
    }

    componentDidMount() {
        this.renderWaveform(this.props);
    }

    render() {
        return(
            <canvas className="waveform-canvas-element" ref="canvas" width={this.props.canvasWidth} height={this.props.canvasHeight} />
        );
  }
}



export default WaveformRenderer;
