/**
 * Used to render a mention suggestions
 */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';

// CSS Module
import css from './Autocomplete.css';

export class AutocompleteSuggestion extends Immutable.Record({
  label: undefined,
  value: undefined
}) { }

export default class Autocomplete extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };

    this.moveSelection = this.moveSelection.bind(this);
    this.clickSelection = this.clickSelection.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.suggestions, this.props.suggestions)) {
      this.setState({
        selectedIndex: 0
      });
    }
  }

  /**
   * Moves the selected suggestion to the previous or next suggestion
   *
   * @param {string} direction Direction can be "up" or "down"
   * @param {Event} event
   */
  moveSelection(direction, event) {
    if (!this.props.suggestions) {
      return;
    }
    this.setState((prevState) => {
      // Set new selected index
      let { selectedIndex } = prevState;
      switch (direction) {
      case 'up':
        if (selectedIndex - 1 < 0) {
          selectedIndex = this.props.suggestions.size - 1;
        } else {
          selectedIndex = selectedIndex - 1;
        }
        break;
      case 'down':
        if (selectedIndex + 1 >= this.props.suggestions.size) {
          selectedIndex = 0;
        } else {
          selectedIndex = selectedIndex + 1;
        }
        break;
      }
      return {
        selectedIndex
      };
    }, () => {
      // Scroll to selected element
      if (this.selectedRef) {
        this.selectedRef.scrollIntoView({
          block: 'nearest'
        });
      }
    });
  }

  /**
   * Triggers a click on the currently selected suggestion
   *
   * @param {Event} event
   */
  clickSelection(event) {
    const { suggestions } = this.props;
    const { selectedIndex } = this.state;
    if (!suggestions) {
      return;
    }
    return this.handleClick(suggestions.get(selectedIndex), event);
  }

  /**
   * Handles when a suggestion was selected on mouse hover
   *
   * @param {number} index
   * @param {Event} event
   */
  handleSelection(index, event) {
    this.setState({
      selectedIndex: index
    });
  }

  /**
   * Handles when a suggestion was clicked
   *
   * @param {AutocompleteSuggestion} suggestion
   * @param {Event} event
   */
  handleClick(suggestion, event) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(suggestion, event);
    }
  }

  render() {
    // get props
    const {
      className,
      suggestions
    } = this.props;

    // get suggestion props
    const suggestionsProps = {
      className: classNames(css.wrap, 'text-editor--autocomplete', className)
    };

    // get state
    const {
      selectedIndex
    } = this.state;

    // hide if rows are not a list
    if (!suggestions) {
      return null;
    }

    return (
      <div {...suggestionsProps}>
        {suggestions.size === 0 ? (
          <div className={css.empty}>
            No suggestions available.
          </div>
        ) : (
          <div className={css.list}>
            {suggestions.entrySeq().map(([index, suggestion]) => (
              <div
                key={index}
                ref={(el) => {
                  if (selectedIndex === index) {
                    this.selectedRef = el;
                  }
                }}
                className={classNames(css.listItem, {
                  [css.active]: selectedIndex === index
                })}
                title={suggestion.title}
                onMouseOver={e => this.handleSelection(index, e)}
                onClick={e => this.handleClick(suggestion, e)}
              >
                {suggestion.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}


Autocomplete.propTypes = {
  className: PropTypes.string,
  suggestions: PropTypes.instanceOf(Immutable.List),
  onClick: PropTypes.func
};

Autocomplete.defaultProps = {
  className: '',
  suggestions: null,
  onClick: null
};
