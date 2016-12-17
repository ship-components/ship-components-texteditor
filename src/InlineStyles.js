import Icon from 'ship-components-icon';

/**
 * inline styles to be used with draft-js
 * @type    {Array}
 */
const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD',
    iconClass: Icon.format_bold
  },
  {
    label: 'Italic',
    style: 'ITALIC',
    iconClass: Icon.format_italic
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
    iconClass: Icon.format_underlined
  },
  {
    label: 'Strikethrough',
    style: 'STRIKETHROUGH',
    iconClass: Icon.format_strikethrough
  },
  {
    label: 'Code',
    style: 'CODE',
    iconClass: Icon.code
  }
];

export default INLINE_STYLES;
