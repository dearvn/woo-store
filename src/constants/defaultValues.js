import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

export const Emitter = new EventEmitter();
export const SLIDE_MENU_OPEN = 'emit.side.open';
export const SLIDE_MENU_CLOSE = 'emit.side.close';
export const SLIDE_MENU_TOGGLE = 'emit.side.toggle';

//Drawer
export const openDrawer = () => Emitter.emit(SLIDE_MENU_OPEN);
export const closeDrawer = () => Emitter.emit(SLIDE_MENU_CLOSE);
export const toggleDrawer = () => Emitter.emit(SLIDE_MENU_TOGGLE);

export const NUMBER_TABS_ON_SCREEN = 3;
export const PRODUCT_ATTR_COLOR = 'color';
export const PRODUCT_ATTR_SIZE = 'size';
export const ATTR_COLORS = {
  black: '#333',
  red: '#ff0033',
  green: '#2AB5B3',
  blue: '#38B1E7',
  yellow: '#FDF12C'
};