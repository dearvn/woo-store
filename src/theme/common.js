import { Platform } from 'react-native';

// we define available font weight and styles for each font here
const font = {
  'Roboto Mono': {
    weights: {
      '700': 'Bold',
      '400': 'Regular',
      '500': 'Medium',
      '300': 'Light'
    },
    styles: {
      Italic: 'italic'
    }
  },
  'Roboto': {
    weights: {
      '100': 'Thin',
      '300': 'Light',
      '400': 'Regular',
      '500': 'Medium',
      '700': 'Bold',
      '900': 'Black'
    },
    styles: {
      Italic: 'italic'
    }
  },
  'Lato': {
    weights: {
      '100': 'Hairline',
      '200': 'Thin',
      '300': 'Light',
      '400': 'Regular',
      '500': 'Medium',
      '600': 'Semibold',
      '700': 'Bold',
      '800': 'Heavy',
      '900': 'Black'
    },
    styles: {
      Italic: 'italic'
    }
  }
}

export const COLORS = {
  BACKGROUND: '#FFFFFF',
  BACKGROUND_GRAY: '#e6e6e6',
  BACKGROUND_GRAY_LIGHT: '#f8f8f8',
  MAIN_COLOR: '#00acec',
  MAIN_GREEN: '#24c24e',
  MAIN_DARK_COLOR: '#0081b1',
  DARK_COLOR: '#333',
  TEXT_GRAY: '#adadad',
  TEXT_WHITE: '#FFF',
  TEXT_DARK: '#484848',
  HIGH_LIGHT: '#24c24e',
  RED_HIGH_LIGHT: '#dd0b0f',
  BUTTON_BACKGROUND: '#00acec',
  RED_GRAY: '#f15a67',
  BLUE: '#4e9de0',
  SHADOW: 'rgba(0, 0, 0, 0.10)',
  LINK: '#487acb',
  MAIN_RED: '#9e0b0f',
  MAIN_RED_DARK: '#820b0e',
};

// generate styles for a font with given weight and style
export const fontMaker = (options = {}) => {
  let { weight, style, family } = Object.assign({
    weight: null,
    style: null,
    family: 'Roboto Mono'
  }, options);

  const { weights, styles } = font[family];

  if (Platform.OS === 'android') {
    weight = weights[weight] ? weights[weight] : '';
    style = styles[style] ? style : '';

    const suffix = weight + style;

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : ''),
      fontWeight: 'normal'
    };
  } else {
    style = styles[style] || 'normal';

    return {
      fontFamily: family,
      fontWeight: weight || '400',
      fontStyle: style
    };
  }
};

export function randomColor () {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

