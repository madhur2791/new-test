import React from 'react';
import Slider from 'rc-slider';


class ColorListRenderer extends React.Component {
    constructor(props) {
        super(props);
        const { colorPallets, selectedColorPallet } = props;
        this.reArrangeColorPallets = this.reArrangeColorPallets.bind(this);
        this.state = {};
        if(
            colorPallets &&
            colorPallets.isFetching === false &&
            colorPallets.data &&
            colorPallets.data.length > 0
        ) {
            this.state.reArrangedColorPalltes = this.reArrangeColorPallets(colorPallets.data, selectedColorPallet);
        }
    }

    reArrangeColorPallets(colorPallets, selectedColorPallet) {
        const reArrangedColorPallets = [];

        if(selectedColorPallet) {
            reArrangedColorPallets.push({
                id: selectedColorPallet.color_pallet_id,
                colors: selectedColorPallet.colors,
                name: selectedColorPallet.color_pallet_name || 'Name'
            });
        }

        if(colorPallets) {
            colorPallets.forEach((colorPallet) => {
                if(!selectedColorPallet || selectedColorPallet.color_pallet_id !== colorPallet.id) {
                    reArrangedColorPallets.push(colorPallet);
                }
            });
        }
        return reArrangedColorPallets;
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props) {
        const { colorPallets, colorPalletSelectionHandler, selectedColorPallet } = props;
        const oldColorPallet = this.props.colorPallets;
        console.log(typeof oldColorPallet.data === 'undefined');
        if(
            colorPallets &&
            colorPallets.isFetching === false &&
            colorPallets.data &&
            colorPallets.data.length > 0 &&
            typeof oldColorPallet.data === 'undefined'
        ) {
            this.setState({
                reArrangedColorPalltes: this.reArrangeColorPallets(colorPallets.data, selectedColorPallet)
            });
        }
    }

    render() {
        const { colorPalletSelectionHandler, selectedColorPallet } = this.props;
        const colorPalletList = [];

        if(
            this.state &&
            this.state.reArrangedColorPalltes
        ) {
            this.state.reArrangedColorPalltes.forEach((colorPallet, index) => {
                const colorsList = [];
                colorPallet.colors.forEach((color, index) => {
                    colorsList.push((
                        <div
                            key={index}
                            className="colorPalletColorBlock"
                            style={{backgroundColor: `#${color}`}}
                        />
                    ));
                });
                colorPalletList.push((
                    <div
                        className={
                            `colorPalletContainer ${parseInt(selectedColorPallet.color_pallet_id, 10) === parseInt(colorPallet.id, 10) && 'active'}`
                        }
                        key={colorPallet.id}
                        onClick={() => (colorPalletSelectionHandler(colorPallet, true))}
                    >
                        <span className="colorPalletName">{colorPallet.name}</span>
                        <div className="colorPallet" >{colorsList}</div>
                    </div>
                ));
            });
        }
        return (
            <div>
                {colorPalletList}
            </div>
        );
    }
}

export default ColorListRenderer;
