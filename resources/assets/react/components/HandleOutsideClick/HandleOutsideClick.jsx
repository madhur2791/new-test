import React from 'react';
import PropTypes from 'prop-types';


class HandleOutsideClick extends React.Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handleOutsideClick(event);
    }
  }

  render() {
    const CustomTag = this.props.tagName || 'div';
    return (
      <CustomTag className={this.props.className} ref={(el) => { this.wrapperRef = el; }}>
        {this.props.children}
      </CustomTag >
    );
  }
}


HandleOutsideClick.propTypes = {
  handleOutsideClick: PropTypes.func.isRequired,
  tagName: PropTypes.string,
  className: PropTypes.string
};

HandleOutsideClick.defaultProps = {
  tagName: 'div',
  className: ''
};

export default HandleOutsideClick;
