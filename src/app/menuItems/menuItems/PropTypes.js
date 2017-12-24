// @flow

import PropTypes from 'prop-types';

export const MenuItemProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}).isRequired;

export const MenuItemsProp = PropTypes.arrayOf(MenuItemProp);
