import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BACKGROUND
  },
  fullWidthCenter: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND
  },
  lblThanks: {
    ...fontMaker({ weight: '900', family: 'Roboto' }),
    color: COLORS.HIGH_LIGHT,
    backgroundColor: 'transparent',
    fontSize: 30,
    marginTop: 60
  },
  lblForYourOrder: {
    ...fontMaker({ weight: '400', family: 'Roboto' }),
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    fontSize: 17,
  },
  lblOrderNumber: {
    ...fontMaker({ weight: '400', family: 'Roboto' }),
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  lblOrderNumberBold: {
    ...fontMaker({ weight: '700', family: 'Roboto' }),
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  image: {
    width: width / 3 * 2,
    resizeMode: 'contain'
  },
  lblEstimated: {
    ...fontMaker({ weight: '700', family: 'Roboto' }),
    color: COLORS.HIGH_LIGHT,
    backgroundColor: 'transparent',
    fontSize: 20
  },
  trackOrderContainer: {
    width: width - 40,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT_DARK
  },
  lblTrackOrder: {
    ...fontMaker({ weight: '700', family: 'Roboto' }),
    color: COLORS.TEXT_WHITE,
    backgroundColor: 'transparent',
    fontSize: 20
  },
  buttonNext: {
    height: 50,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_COLOR,
  },
  textNext: {
    ...fontMaker({ weight: '700', family: 'Roboto' }),
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  nextIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  }
});

export default styles;