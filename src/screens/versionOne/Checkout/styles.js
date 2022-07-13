import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerLeft: {
    justifyContent: 'center'
  },
  backIcon: {
    width: 22,
    height: 32,
    margin: 10
  },
  underlineStyle: {
    height: 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.BUTTON_BACKGROUND
  }
});

export default styles;