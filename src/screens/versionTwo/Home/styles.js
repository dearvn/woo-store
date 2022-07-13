import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');
const bannerHeight = width * 30 / 81;
const searchBox = 36;
const heightOneRow = 200;

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_GRAY
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
  searchContainer: {
    backgroundColor: COLORS.MAIN_RED,
    width,
    paddingBottom: 10
  },
  categoriesContainer: {
    width,
    height: heightOneRow,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  title: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    padding: 10,
    lineHeight: 18
  },
  subTitle: {
    fontSize: 11,
    color: COLORS.TEXT_DARK,
    padding: 10
  },
  categoryContainer: {
    width: 120,
    height: 160,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.TEXT_WHITE,
    borderColor: COLORS.TEXT_GRAY,
    borderWidth: 1,
    borderLeftWidth: 0
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.TEXT_WHITE
  },
  headerContainer: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  link: {
    fontSize: 17,
    color: COLORS.MAIN_RED,
    padding: 10,
    lineHeight: 18
  }
});

export default styles;
