import { StyleSheet, Dimensions, Platform } from 'react-native';

import { COLORS, fontMaker } from '../../../theme/common';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  // Textinput
  textinputContainer: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageIcon: {
    margin: 8,
    marginTop: 23,
    width: 22,
    height: 22,
    resizeMode: 'contain'
  },
  containerInput :{
    marginLeft: 5,
    marginRight: 5,
    flex: 1
  },
  buttonSignup: {
    margin: 20,
    width: width - 40,
    marginTop: 40,
    padding: 20,
    alignItems: 'center',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.BUTTON_BACKGROUND
  },
  textSignup: {
    ...fontMaker({weight: '700', family: 'Roboto'}),
    backgroundColor: 'transparent',
    color: COLORS.TEXT_WHITE,
    fontSize: 16
  }
});

export default styles;
