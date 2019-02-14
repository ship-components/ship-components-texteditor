import Icon from 'ship-components-icon';

/**
 * Link types to be used with draft-js
 * @type    {Array}
 */
const LINK_TYPES = [
  {
    label: 'Link',
    action: 'ADD',
    whenLink: false,
    iconClass: Icon.insert_link
  },
  {
    label: 'Edit Link',
    action: 'EDIT',
    whenLink: true,
    iconClass: Icon.insert_link
  },
  {
    label: 'Remove Link',
    action: 'DELETE',
    whenLink: true,
    iconClass: Icon.remove_circle_outline
  }
];

export default LINK_TYPES;
