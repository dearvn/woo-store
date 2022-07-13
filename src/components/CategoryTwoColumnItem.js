import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';

import { COLORS } from '../theme/common';
import ImageLoad from './ImageLoad';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    width: width / 2,
    height: width / 2 * 5 / 6,
    borderWidth: 0,
    borderColor: COLORS.TEXT_GRAY
  },
  containerWrap: {
    margin: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.TEXT_GRAY
  },
  image: {
    width: '100%',
    height: '100%'
  },
  nameContainer: {
    position: 'absolute',
    bottom: 5,
    width: 110,
    height: 35,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLORS.TEXT_WHITE,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: COLORS.TEXT_WHITE,
    fontSize: 12,
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
};

class CategoryTwoColumnItem extends PureComponent {
  static propTypes = {
    category: PropTypes.object.isRequired,
    onPressItem: PropTypes.func.isRequired
  };

  onPressItem (id) {
    this.props.onPressItem(id);
  }

  render () {
    const { category } = this.props;
    const id = _.get(category, 'id');
    const image = { uri: _.get(category, 'image.src') };
    const name = _.get(category, 'name');
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.containerWrap} onPress={() => this.onPressItem(id)}>
          <ImageLoad
            style={styles.image}
            loadingStyle={{ size: 'large', color: COLORS.MAIN_COLOR }}
            source={image}
            resizeMethod={'resize'}
          />
          <View style={styles.nameContainer}>
            <CustomText weight={500} style={styles.name} numberOfLines={2}>{name}</CustomText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CategoryTwoColumnItem;
