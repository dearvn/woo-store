import React from 'react';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
import { COLORS, fontMaker } from '../theme/common';
import CustomText from './CustomText';
import themeStyles from '../theme/styles';

class CustomButton extends React.Component {
  
  render() {
    const {
      btnStyle = {},
      onPress,
      textStyle = null,
      color = COLORS.BLUE,
      text = '',
      shadow,
      disabled
    } = this.props;
    return(
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.7}
        style={[{
          backgroundColor: color,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: color,
          margin: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: 'center'
        }, shadow && themeStyles.shadow, btnStyle]}
        onPress={!disabled ? onPress : null}>
        <CustomText style={[
          {
            color: COLORS.TEXT_WHITE
          },
          disabled && { color: 'rgba(255, 255, 255, 0.3)' },
          textStyle
        ]}>{text}</CustomText>
      </TouchableOpacity>
    );
  }
}

export default CustomButton;
