/**
 * @file Modal for link editing
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 */
// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { Confirm } from 'ship-components-dialog';
import TextInput from 'ship-components-textinput';

export default class LinkModal extends Component {
  constructor(props) {
    super(props);

    // Set state for the first time
    this.state = {
      href: this.props.href
    };

    // Binding
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Performance catch
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.href !== this.props.href ||
           nextState.href !== this.state.href;
  }

  /**
   * Handle user input for links
   */
  handleChange(event) {
    this.setState({
      href: event.target.value
    });
  }

  /**
   * User clicks delete link
   */
  handleDelete(event) {
    if (this.props.onDelete) {
      this.props.onDelete(event);
    }
  }

  /**
   * User clicks confirm
   */
  handleConfirm(event) {
    if (this.props.onConfirm) {
      this.props.onConfirm(this.state, event);
    }
  }

  /**
   * User clicks close
   */
  handleClose() {
    if (this.props.onClose) {
      this.props.onClose(this.state, event);
    }
  }

  /**
   * Make it all happen
   * @return    {React}
   */
  render() {
    return (
      <Confirm
        name={this.props.title}
        onConfirm={this.handleConfirm}
        onClose={this.handleClose}
      >
        <TextInput
          placeholder='http://'
          value={this.state.href}
          onChange={this.handleChange}
        />
      </Confirm>
    )
  }
}

LinkModal.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
};

LinkModal.defaultProps = {
  href: '',
  onConfirm: void 0,
  onClose: void 0
}
