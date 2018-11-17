import React from 'react';
import { ChromePicker } from 'react-color';
import HandleOutsideClick from '../../../../components/HandleOutsideClick/HandleOutsideClick.jsx';

class CreateColorRenderer extends React.Component {
    constructor(props) {
        super(props);

        this.toggleColorPalletPopup = this.toggleColorPalletPopup.bind(this);
        this.colorPalletTempNameHandler = this.colorPalletTempNameHandler.bind(this);
        this.updateColorPalletName = this.updateColorPalletName.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.showColorSelector = this.showColorSelector.bind(this);
        this.closeColorPicker = this.closeColorPicker.bind(this);
        this.editCurrentColor = this.editCurrentColor.bind(this);
        this.storeColor = this.storeColor.bind(this);
        this.editColorTemplateName = this.editColorTemplateName.bind(this);
        this.closeColorPalletPopup = this.closeColorPalletPopup.bind(this);
        this.deleteCurrentColor = this.deleteCurrentColor.bind(this);

        this.state = {
            showColorPalletPopup: false,
            colorPalletName: '',
            colorPalletTempName: '',
            showColorPicker: false,
            choosenColorList: [],
            currentColorEditIndex: 0
        };
    }

    toggleColorPalletPopup() {
        this.setState((currentState) => {
            return {
                showColorPalletPopup: !currentState.showColorPalletPopup
            }
        })
    }

    closeColorPalletPopup() {
        this.setState({
            showColorPalletPopup: false
        });
    }

    deleteCurrentColor(e, index) {
        e.stopPropagation();
        this.setState((state) => {
            const updatedColorList = Object.assign([], state.choosenColorList);
            updatedColorList.splice(index, 1);
            return {
                currentColorEditIndex: updatedColorList.length,
                choosenColorList: updatedColorList,
                showColorPicker: false
            }
        });
    }

    storeColor() {
        const { createColorPalletSuccess, colorPalletSelectionHandler } = this.props;
        axios.post(`/web-api/color-pallets`, {
            name: this.state.colorPalletName,
            colors: this.state.choosenColorList.map(color => color.replace('#', ''))
        }).then((response) => {
            colorPalletSelectionHandler(response.data, true);
            createColorPalletSuccess(response.data);
            this.setState({
                showColorPalletPopup: false,
                colorPalletName: '',
                colorPalletTempName: '',
                choosenColorList: [],
            });
        })
    }

    editColorTemplateName() {
        this.setState({
            colorPalletName: ''
        });
    }

    showColorSelector() {
        this.setState((state) => {
            const updatedColorList = state.choosenColorList;
            const currentIndex = state.choosenColorList.length;
            updatedColorList[currentIndex]= '#22194D';
            return {
                currentColorEditIndex: currentIndex,
                choosenColorList: updatedColorList,
                showColorPicker: true
            }
        });
    }

    handleChangeComplete(color) {
        this.setState((state) => {
            const updatedColorList = state.choosenColorList;
            updatedColorList[this.state.currentColorEditIndex] = color.hex;
            return {
                choosenColorList: updatedColorList
            }
        });
    }

    closeColorPicker(color) {
        this.setState((state) => {
            return {
                showColorPicker: false,
                currentColorEditIndex: state.choosenColorList.length
            }
        });
    }

    editCurrentColor(index) {
        console.log('asdasdas');
        this.setState({
            currentColorEditIndex: index,
            showColorPicker: true,
        });
    }

    colorPalletTempNameHandler(event) {
        const { changeWaveformText, match } = this.props;
        this.setState({
            colorPalletTempName: event.target.value
        });
    }

    updateColorPalletName(event) {
        this.setState({
            colorPalletName: this.state.colorPalletTempName
        });
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render() {
        let colorPalletPopup = '';
        if(this.state.showColorPalletPopup === true) {
            let choosenColors = [];
            this.state.choosenColorList.forEach((color, index) => {
                choosenColors.push(
                    <div
                        className="choosenColorsDisplay"
                        style={{backgroundColor: color}}
                        key={index}
                        onClick={() => {this.editCurrentColor(index)}}
                    >
                        <div
                            className="displayColorDeleteButton"
                            onClick={(e) => {this.deleteCurrentColor(e, index)}}
                        >
                        x
                        </div>
                    </div>
                );
            });

            if (this.state.choosenColorList.length < 5) {
                choosenColors.push(
                <div
                    className="choosenColorsDisplay addColorButton"
                    onClick={() => {this.showColorSelector()}}
                    key={this.state.choosenColorList.length}
                >+</div>
                );
            }


            colorPalletPopup = (
                <div className="colorPalletPopupOverlay">
                    <div className="colorPalletPopup">
                        <div
                            className="colorPalletPopupClose"
                            onClick={this.closeColorPalletPopup}
                        >x</div>
                        {
                            this.state.colorPalletName === '' ?
                            (
                                <div className="colorPalletNameInputContainer form-group">
                                    <label>Name your color pallet</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Name your color pallet"
                                        value={this.state.colorPalletTempName}
                                        onChange={this.colorPalletTempNameHandler}
                                    />
                                    {
                                        this.state.colorPalletTempName !== '' ?
                                        <input className="btn btn-primary saveColorPalletNameButton" type="submit" value="save" onClick={this.updateColorPalletName} />
                                        : ''
                                    }
                                </div>
                            ) :
                            (
                                <div >
                                    <div className="createdColorPalletName">
                                        {this.state.colorPalletTempName}
                                        <span
                                            className="colorPalletNameEdit"
                                            onClick={this.editColorTemplateName}
                                        >
                                            edit
                                        </span>
                                    </div>
                                    <div className="createdColorPalletDesc">
                                        Choose 1 - 5 colors for your color palette
                                    </div>
                                    <div className="choosenColorsContainer clearfix">
                                        {choosenColors}
                                    </div>
                                    {this.state.showColorPicker === true ?
                                        <div className="colorLibraryContainer">
                                            <HandleOutsideClick
                                                handleOutsideClick={this.closeColorPicker}
                                            >
                                                <ChromePicker
                                                    color={this.state.choosenColorList[this.state.currentColorEditIndex]}
                                                    onChangeComplete={ this.handleChangeComplete }
                                                />
                                            </HandleOutsideClick>
                                            <div

                                                className="colorPickerCloseContainer"
                                            >
                                                <div
                                                    className="colorPickerCloseButton"
                                                    onClick={this.closeColorPicker}
                                                >
                                                    Choose
                                                </div>
                                            </div>
                                        </div>
                                     : ''}
                                    {
                                        this.state.choosenColorList.length > 0 ?
                                        (
                                            <div
                                                className="storeColorButton"
                                                onClick={this.storeColor}
                                            >
                                            Store
                                            </div>
                                        )
                                        : ''
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div
                    className="createColorPalletContainer"
                    onClick={this.toggleColorPalletPopup}
                >
                    <span className="createColorPalletPlus">+</span>
                    <span className="createcolorPalletTempName">Make color pallet</span>
                </div>
                {colorPalletPopup}
            </div>
        );
    }
}

export default CreateColorRenderer;
