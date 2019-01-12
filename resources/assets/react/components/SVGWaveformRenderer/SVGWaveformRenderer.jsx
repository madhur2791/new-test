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

    let flatColorLength = 0;
    let diffusedColorLength = 0;

    if (colors.length === 1) {
        flatColorLength = dataPointsCount;
        diffusedColorLength = 0;
    } else {
        flatColorLength = Math.ceil(dataPointsCount * (1 - normalizedDiffusion) / colors.length);
        diffusedColorLength = Math.ceil(dataPointsCount * normalizedDiffusion / (colors.length - 1));
    }


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

const getSoundWaveSampleSvg = (xPoint, sampleData, waveType) => {
    const samples = [];
    if (waveType === 'linear') {
        samples.push(<line
            key={xPoint}
            x1={((sampleData.xPoint - 0.5) * (sampleData.sampleSpacing) + sampleData.xShift)}
            y1={sampleData.centerY - sampleData.prevSample}
            x2={sampleData.xPoint * (sampleData.sampleSpacing) + sampleData.xShift}
            y2={sampleData.centerY + sampleData.amplifiedValue}
            stroke={sampleData.color}
            strokeWidth={sampleData.lineWidth}
            strokeLinecap="round" />
        );

        samples.push(<line
            key={xPoint + 0.5}
            x1={sampleData.xPoint * (sampleData.sampleSpacing) + sampleData.xShift}
            y1={sampleData.centerY + sampleData.amplifiedValue}
            x2={(sampleData.xPoint + 0.5) * (sampleData.sampleSpacing) + sampleData.xShift}
            y2={sampleData.centerY - sampleData.amplifiedValue}
            stroke={sampleData.color}
            strokeWidth={sampleData.lineWidth}
            strokeLinecap="round" />
        );
    } else if (waveType === 'bars') {
        samples.push(<line
            key={xPoint}
            x1={sampleData.xPoint * (sampleData.sampleSpacing) + sampleData.xShift}
            y1={sampleData.centerY - sampleData.amplifiedValue}
            x2={sampleData.xPoint * (sampleData.sampleSpacing) + sampleData.xShift}
            y2={sampleData.centerY + sampleData.amplifiedValue}
            stroke={sampleData.color}
            strokeWidth={sampleData.lineWidth}
        />
        );
    } else if (waveType === 'radial') {
        const currentAngle = sampleData.startAngle + ((sampleData.xPoint * 360) / sampleData.sampleLength);
        let nextAngle = sampleData.startAngle + (((sampleData.xPoint + 1) * 360) / sampleData.sampleLength);
        nextAngle = ((sampleData.lineWidth / (sampleData.lineWidth + sampleData.lineSpacing)) * (nextAngle - currentAngle)) + currentAngle;
        const currentRadAngle = currentAngle * Math.PI / 180;
        const nextRadAngle = nextAngle * Math.PI / 180;
        const outerRadius = sampleData.innerRadius + sampleData.amplifiedValue;
        const innerArcFirstPoint = {
            x: (sampleData.innerRadius * Math.cos(currentRadAngle)) + sampleData.centerX,
            y: (sampleData.innerRadius * Math.sin(currentRadAngle)) + sampleData.centerY
        };
        const innerArcSecondPoint = {
            x: (sampleData.innerRadius * Math.cos(nextRadAngle)) + sampleData.centerX,
            y: (sampleData.innerRadius * Math.sin(nextRadAngle)) + sampleData.centerY
        };
        const outerArcFirstPoint = {
            x: ((outerRadius) * Math.cos(currentRadAngle)) + sampleData.centerX,
            y: ((outerRadius) * Math.sin(currentRadAngle)) + sampleData.centerY
        };
        const outerArcSecondPoint = {
            x: ((outerRadius) * Math.cos(nextRadAngle)) + sampleData.centerX,
            y: ((outerRadius) * Math.sin(nextRadAngle)) + sampleData.centerY
        };
        samples.push(
            <path
                key={xPoint}
                d={`M${innerArcFirstPoint.x},${innerArcFirstPoint.y} A${sampleData.innerRadius},${sampleData.innerRadius} 0 0,1 ${innerArcSecondPoint.x},${innerArcSecondPoint.y} L${outerArcSecondPoint.x},${outerArcSecondPoint.y} A${outerRadius},${outerRadius} 0 0,0 ${outerArcFirstPoint.x},${outerArcFirstPoint.y}`} fill={sampleData.color}
            />
        );
    }

    return samples;
};

const getWaveformGridSvg = (waveType, lineDashWidth, innerRadius, canvasDetails) => {
    const gridLines = [];
    if (waveType === 'linear' || waveType === 'bars') {
        const lineMaxWidth = 20;
        const numberOfLines = canvasDetails.height / 20;
        for (let i=0; i < numberOfLines / 2; i++) {
            gridLines.push(
                <line
                    key={i}
                    x1={0}
                    y1={canvasDetails.centerY - (lineMaxWidth * i)}
                    x2={canvasDetails.width}
                    y2={canvasDetails.centerY - (lineMaxWidth * i)}
                    stroke="#fff"
                    strokeWidth={lineDashWidth}
                    strokeLinecap="square"
                />
            );
            gridLines.push(
                 <line
                    key={i + 0.5}
                    x1={0}
                    y1={canvasDetails.centerY + (lineMaxWidth * i)}
                    x2={canvasDetails.width}
                    y2={canvasDetails.centerY + (lineMaxWidth * i)}
                    stroke="#fff"
                    strokeWidth={lineDashWidth}
                    strokeLinecap="square"
                />
            );
        }
    } else if (waveType === 'radial') {
        const lineMaxWidth = 20;
        const numberOfLines = (canvasDetails.height - innerRadius) / 20;

        for (let i = 0; i < numberOfLines; i++) {
            gridLines.push(
                <circle
                    key={i}
                    cx={canvasDetails.centerX}
                    cy={canvasDetails.centerY}
                    r={innerRadius + i * lineMaxWidth}
                    stroke="#fff"
                    strokeWidth={lineDashWidth}
                    fill="none"
                />
            )
        }
    }
    return gridLines;
};

const getTextSvg = (uniqueNumber, textDetails, canvasDetails) => {
    const position = {
        x: 20,
        y: 20
    };
    let horizantalAlignment = "";
    let verticalAlignment = "";
    switch(textDetails.horizantal_alignment) {
        case 'left':
            position.x = 20;
            horizantalAlignment = 'start';
        break;
        case 'right':
            position.x = canvasDetails.width - 20;
            horizantalAlignment = 'end';
        break;
        case 'center':
            position.x = canvasDetails.width / 2;
            horizantalAlignment = 'middle';
        break;
    }

    switch(textDetails.vertical_alignment) {
        case 'top':
            position.y = 20 + textDetails.font_size;
            verticalAlignment = "baseline";
        break;
        case 'bottom':
            position.y = canvasDetails.height - 20;
            verticalAlignment = "baseline";
        break;
        case 'middle':
            position.y = canvasDetails.height / 2;
            verticalAlignment = "central";
        break;
    }
    return (
        <text
            key={((new Date()).getTime())}
            x={position.x}
            y={position.y}
            fill={`#${textDetails.font_color}`}
            textAnchor={horizantalAlignment}
            dominantBaseline={verticalAlignment}
            fontSize={textDetails.font_size}
            fontFamily={textDetails.font_family}
        >
            {textDetails.text}
        </text>
    );
};

const getWatermarkSvg = (canvasDetails) => {
    const imageAspectRatio = 100/394;
    const imageWidth = canvasDetails.width * 0.5;
    const imageHeight = imageWidth * imageAspectRatio;
    const imagePosition = {
        x: (canvasDetails.width - imageWidth) / 2,
        y: (canvasDetails.height - imageHeight) / 2
    };
    const stringifiedSvg =
        `<image
            href="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/watermark-overlay.png"
            x="0"
            y="0"
            width="${canvasDetails.width}px"
        />`;
    return <g
        dangerouslySetInnerHTML={{__html: stringifiedSvg}}
        key={((new Date()).getTime()) + 1}
    />
};

let qrCodeElement = '';
let qrCodeSize = 0;
let qrCodeHorizantalAlignment = '';
let qrCodeVerticalAlignment = '';

class SVGWaveformRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getQrCodeSvg = this.getQrCodeSvg.bind(this);
        this.generatedImage = '';
    }

    getQrCodeSvg(qrCodeDetails, canvasDetails) {
        const position = {
            x: 20,
            y: 20
        };

        if(
            !qrCodeElement ||
            qrCodeDetails.size !== qrCodeSize ||
            qrCodeDetails.horizantal_alignment !== qrCodeHorizantalAlignment ||
            qrCodeDetails.vertical_alignment !== qrCodeVerticalAlignment
        ) {
            qrCodeSize = qrCodeDetails.size;
            qrCodeVerticalAlignment = qrCodeDetails.vertical_alignment;
            qrCodeHorizantalAlignment = qrCodeDetails.horizantal_alignment;
            qrCodeElement = [];
            const qr = qrcode(0, 'M');
            qr.addData(qrCodeDetails.qr_code_value);
            qr.make();

            const length = qr.getModuleCount();
            const cellSize = parseInt(qrCodeDetails.size, 10) / length;

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

            qrCodeElement.push(
                <rect
                    key={-1}
                    x={position.x - cellSize}
                    y={position.y - cellSize}
                    width={(length + 2) * cellSize}
                    height={(length + 2) * cellSize}
                    style={{
                        fill: "#fff",
                        strokeWidth: 0,
                        stroke: "#fff"
                    }}
                />
            );

            for (var row = 0; row < length; row++) {
                for (var col = 0; col < length; col++) {
                    qrCodeElement.push(
                        <rect
                            key={row * length + col}
                            x={position.x + (row * cellSize)}
                            y={position.y + (col * cellSize)}
                            width={cellSize}
                            height={cellSize}
                            rx="0" ry="0"
                            style={{
                                fill: qr.isDark(row, col) ? '#000' : '#fff',
                                strokeWidth: 0,
                                stroke: qr.isDark(row, col) ? '#000' : '#fff'
                            }}
                        />
                    );
                }
            }
        }

        return qrCodeElement;
    }
    getSvgElements(props, generateAndStore = false) {
        let svgElements = [];
        const {
            qrCodeDetails,
            textDetails,
            wavefromColor,
            wavefromStyle,
            showWatermarkGrid
        } = props;

        let {
            horizantalMargin,
            verticalMargin,
            canvasWidth,
            canvasHeight
        } = props;
        horizantalMargin = typeof horizantalMargin !== 'undefined' ? horizantalMargin : canvasWidth * 0.075;
        verticalMargin = typeof verticalMargin !== 'undefined' ? verticalMargin : 20;

        if(props.waveformData.data && typeof wavefromColor.colors !== "undefined") {
            let waveformType = wavefromStyle.waveform_type;
            let lineWidth = parseInt(wavefromStyle.line_width, 10);
            let lineSpacing = parseFloat(wavefromStyle.line_spacing);
            let lineDashWidth = parseInt(wavefromStyle.line_dash_width ,10);
            let innerRadius = parseInt(wavefromStyle.inner_radius, 10);
            let startAngle = parseInt(wavefromStyle.start_angle, 10);

            let lineWidthRange = [1, 40];
            let lineSpacingRange = [0, 40];
            let lineDashWidthRange = [0, 18];
            let innerRadiusRange = [0, 200];
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
            canvasWidth = canvasWidth - horizantalMargin;
            canvasHeight = canvasHeight - verticalMargin;
            const xShift = lineWidth / 2;
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
            for(let xPoint = Math.ceil(horizantalMargin / samplingRate); xPoint < reSampledDataPoints.length; xPoint+=1) {
                let absValue = Math.abs(reSampledDataPoints[xPoint] / maxValue);
                if(absValue === 1) {
                    absValue = 0.99;
                }
                const amplifiedValue = absValue * amplificationFactor;
                const sampleColor = fetchColor(computedColors, xPoint, absValue, wavefromColor.color_option);

                svgElements.push(getSoundWaveSampleSvg(
                    xPoint,
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
                        innerRadius,
                        xShift
                    },
                    waveformType
                ));
                prevSample = amplifiedValue;
            }

            if(lineDashWidth > 0) {
                svgElements.push(
                    getWaveformGridSvg(waveformType, lineDashWidth, innerRadius, {
                        width: canvasWidth,
                        height: canvasHeight,
                        centerX,
                        centerY
                    })
                );
            }

            if (qrCodeDetails && qrCodeDetails.enabled === true && qrCodeDetails.qr_code_value) {
                svgElements.push(this.getQrCodeSvg(qrCodeDetails, {
                    width: canvasWidth + horizantalMargin,
                    height: canvasHeight + verticalMargin
                }));
            }

            if (textDetails && textDetails.text) {
                svgElements.push(
                    getTextSvg(reSampledDataPoints.length, textDetails, {
                        width: canvasWidth,
                        height: canvasHeight
                    })
                );
            }

            if(showWatermarkGrid && showWatermarkGrid !== false) {
                svgElements.push(
                    getWatermarkSvg({
                        width: canvasWidth + horizantalMargin,
                        height: canvasHeight + verticalMargin
                    })
                );
            }
        }

        return svgElements;
    }

    render() {
        let svgElements = this.getSvgElements(this.props);
        return (
            <div className="waveform-canvas-element" ref={c => (this.generatedImage = c)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${this.props.canvasWidth} ${this.props.canvasHeight}`} preserveAspectRatio="xMidYMid meet">
                <defs>
                    <style type="text/css">
                        @import url('https://fonts.googleapis.com/css?family=Aguafina+Script|Amatic+SC|Cormorant+SC|Cormorant+Upright|Cutive+Mono|Dancing+Script|Farsan|Fredericka+the+Great|Give+You+Glory|Great+Vibes|Indie+Flower|Kranky|La+Belle+Aurore|Life+Savers|Mandali|Marvel|Monoton|Nanum+Myeongjo|Nixie+One|Orbitron|Poiret+One|Pompiere|Princess+Sofia|Reenie+Beanie|Roboto|Rouge+Script|Sacramento|Sail|Short+Stack|Special+Elite|Tulpen+One');
                    </style>
                </defs>
                    {svgElements}
                </svg>
            </div>
        );
  }
}



export default SVGWaveformRenderer;
