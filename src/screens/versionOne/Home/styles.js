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
    backgroundColor: '#fff'
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
  }
});

export default styles;
