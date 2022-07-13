import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');
const searchHeight = 55;
const searchBox = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  footerContainer: {
    width,
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  btnContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.MAIN_RED
  },
  lblFooter: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18
  },
  dot: {
    marginHorizontal: 5
  }
});

export default styles;
