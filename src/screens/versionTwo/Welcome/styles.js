import { Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common'

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MAIN_RED_DARK,
  },
  swiperImage: {
    width: width,
    flex: 1,
    resizeMode: 'cover'
  },
  // Footer text
  viewUnder: {
    width: width,
    height: height / 3,
    alignItems: 'center'
  },
  mainText: {
    marginTop: 25,
    backgroundColor: 'transparent',
    fontSize: 22,
    color: COLORS.TEXT_DARK,
    ...fontMaker({ weight: '400', family: 'Roboto' })
  },
  boldText: {
    ...fontMaker({ weight: '700', family: 'Roboto' }),
    color: COLORS.TEXT_DARK,
    fontSize: 22
  },
  shortline: {
    width: 50,
    height: 3,
    backgroundColor: COLORS.MAIN_RED,
    margin: 10
  },
  description: {
    padding: 30,
    textAlign: 'center',
    color: '#5a5449',
    fontSize: 16,
    ...fontMaker({weight: '400', family: 'Roboto'})
  },
  buttonGetstarted: {
    backgroundColor: COLORS.MAIN_RED,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: 50
  },
  textGetstarted: {
    color: COLORS.TEXT_WHITE,
    fontSize: 20,
    backgroundColor: 'transparent',
    ...fontMaker({weight: '700', family: 'Roboto'})
  }
};

export default styles;
