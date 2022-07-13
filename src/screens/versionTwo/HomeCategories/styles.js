import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  fullWidth: {
    width,
    borderTopWidth: 1,
    borderTopColor: COLORS.DARK_COLOR
  },
  headerLeft: {
    justifyContent: 'center'
  },
  backIcon: {
    width: 22,
    height: 32,
    margin: 10
  },
});

export default styles;
