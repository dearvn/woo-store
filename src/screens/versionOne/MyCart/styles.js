import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');
const searchHeight = 55;
const searchBox = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  footerContainer: {
    width,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.MAIN_COLOR
  },
  lblFooter: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18,
    ...fontMaker({ weight: '400', family: 'Roboto' }),
  },
  dot: {
    marginHorizontal: 5
  }
});

export default styles;
