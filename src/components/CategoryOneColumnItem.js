import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, TouchableOpacity } from 'react-native';

import { COLORS } from '../theme/common';
import ImageLoad from './ImageLoad';
import CustomText from './CustomText';
import themeStyles from '../theme/styles';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    width,
    height: width / 2 * 5 / 6,
    borderWidth: 0,
    borderColor: COLORS.TEXT_GRAY,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  containerWrap: {
    margin: 3,
    backgroundColor: COLORS.BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.TEXT_GRAY,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  name: {
    fontSize: 14,
    margin: 10
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
      <TouchableOpacity style={[styles.container, themeStyles.shadow]} onPress={() => this.onPressItem(id)}>
        <View style={styles.containerWrap}>
          <CustomText style={styles.name} weight={700}>{name}</CustomText>
          <ImageLoad
            style={styles.image}
            loadingStyle={{ size: 'large', color: COLORS.MAIN_COLOR }}
            source={image}
            resizeMethod={'resize'}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default CategoryTwoColumnItem;
