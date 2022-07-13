import { StyleSheet, Dimensions } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');
const searchHeight = 55;
const searchBox = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: 'white'
  },
});

export default styles;
