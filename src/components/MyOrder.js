import React, { Component } from 'react';
import {
  View,
  FlatList,
  Dimensions
} from 'react-native';
import moment from 'moment';

import { COLORS } from '../theme/common';
import CustomText from './CustomText';

const { width } = Dimensions.get('window');
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  fullWidth: {
    width
  },
  itemWrapper: {
    width,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  itemInfo: {
    justifyContent: 'center',
    paddingLeft: 20,
  },
  itemTextStatus: {
    marginRight: 10,
    color: COLORS.MAIN_COLOR,
    fontSize: 15,
    backgroundColor: 'transparent'
  },
  itemDateOrder: {
    color: COLORS.TEXT_DARK,
    fontSize: 15,
  },
  itemOrderId: {
    color: COLORS.TEXT_GRAY,
    fontSize: 13,
    marginTop: 4
  },
  separator: {
    backgroundColor: COLORS.TEXT_GRAY,
    width,
    height: 0.5
  }
};

class MyOrder extends Component {

  _keyExtractor = (item, index) => index;

  _renderItem = (item, index) => {
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.itemInfo}>
          <CustomText weight={400} style={styles.itemDateOrder}>{moment(item['date_created']).format('DD-MMM-YYYYY')}</CustomText>
          <CustomText weight={400} style={styles.itemOrderId}>Order id #{item['id']}</CustomText>
        </View>
        <CustomText weight={400} style={styles.itemTextStatus}>{item['status']}</CustomText>
      </View>
    )
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.fullWidth}
        data={this.props.orders}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={() => (<View style={styles.separator} />)}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => this._renderItem(item, index)}
      />
    )
  }
}

export default MyOrder;