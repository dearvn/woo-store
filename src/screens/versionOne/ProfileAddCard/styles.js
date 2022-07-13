import { Platform } from 'react-native';
import { fontMaker } from '../../../theme/common.js';
import { COLORS } from "../../../theme/common";

const styles = {
  screenWrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  addCardWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 25,
    borderRadius: 4
  },
  addCardInputWrapper: {
    height: 40,
    borderWidth: 0.8,
    borderColor: '#d8d8d8',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 0 : 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addCardInput: {
    ...fontMaker({ weight: '500', family: 'Roboto' }),
    fontSize: 17,
    flex: 1,
    color: '#484848',
    marginVertical: 0,
    paddingVertical: 0
  },
  addCardInfoLabel: {
    ...fontMaker({ weight: '500', family: 'Roboto' }),
    fontSize: 10,
    color: '#484848'
  },
  addCardInfoDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 40
  },
  addCardInfoDropdownLabel: {
    ...fontMaker({ weight: '500', family: 'Roboto' }),
    fontSize: 17,
    color: '#484848'
  },
  lblAdd: {
    ...fontMaker({ weight: '600', family: 'Roboto' }),
    fontSize: 17,
    textAlign: 'center',
    color: '#fff'
  },
  btnAdd: {
    borderRadius: 4,
    backgroundColor: COLORS.HIGH_LIGHT,
    paddingVertical: 15
  },
  addText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 17,
    textAlign: 'center',
    ...fontMaker({ weight: '600', family: 'Roboto' })
  }
};

export default styles;
