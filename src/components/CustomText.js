import React from 'react';
import { Text } from 'react-native';
import { COLORS, fontMaker } from '../theme/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CustomText extends React.Component {

  render() {
    const { version, family } = this.props;
    return (
      <Text {...this.props} style={[
        {
          ...fontMaker({
            weight: this.props.weight && this.props.weight.toString() || '500',
            family: family ? family : version === 1 ? 'Roboto' : 'Lato'
          }),
          color: COLORS.TEXT_DARK,
          fontSize: 16,
          backgroundColor: 'transparent'
        },
        this.props.style
      ]}>{this.props.children}</Text>
    );
  }
}

export default connect(
  state => ({ version: state.nav.appVersion }),
  dispatch => bindActionCreators({}, dispatch)
)(CustomText);
