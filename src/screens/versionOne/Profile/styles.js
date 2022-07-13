import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  underlineStyle: {
    height: 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.BUTTON_BACKGROUND
  }
});

export default styles;