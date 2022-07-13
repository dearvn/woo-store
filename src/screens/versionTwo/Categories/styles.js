import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');
const bannerHeight = width * 30 / 81;
const searchBox = 36;

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  bannerContainer: {
    width,
    height: bannerHeight
  },
  bannerImage: {
    width,
    height: bannerHeight,
    resizeMode: 'stretch'
  },
  dotStyle: {
    width: 8,
    height: 8
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
