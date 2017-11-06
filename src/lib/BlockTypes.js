import Icon from 'ship-components-icon';

/**
 * block styles to be used with draft-js
 * @type    {Array}
 * @see https://facebook.github.io/draft-js/docs/advanced-topics-custom-block-render-map.html
 */
const BLOCK_TYPES = [
  {
    label: 'H1',
    style: 'header-one'
  },
  {
    label: 'H2',
    style: 'header-two'
  },
  {
    label: 'H3',
    style: 'header-three'
  },
  {
    label: 'H4',
    style: 'header-four'
  },
  {
    label: 'H5',
    style: 'header-five'
  },
  {
    label: 'H6',
    style: 'header-six'
  },
  {
    label: 'Quote',
    style: 'blockquote',
    iconClass: Icon.format_quote
  },
  {
    label: 'Unordered List',
    style: 'unordered-list-item',
    iconClass: Icon.format_list_bulleted
  },
  {
    label: 'Ordered List',
    style: 'ordered-list-item',
    iconClass: Icon.format_list_numbered
  },
  {
    label: 'Code Block',
    style: 'code-block',
    iconClass: Icon.code
  }
];

export default BLOCK_TYPES;
