'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../theme/common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class Rating extends Component {
  
  render() {
    const {rating, size, color, style} = this.props;
    
    let stars = [];
    for (let i = 1; i < 6; i++) {
      stars[i - 1] = <MaterialCommunityIcons
        key={i}
        name={'star-outline'}
        size={size} color={rating >= i ? color : COLORS.TEXT_GRAY}
      />;
    }
    
    return (
      <View style={[styles.container, style]}>
        {stars}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

Rating.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  rating: PropTypes.number.isRequired,
};

//noinspection JSUnusedGlobalSymbols
Rating.defaultProps = {
  size: 20,
  color: '#FFC107',
  rating: 5,
};

export default Rating;
