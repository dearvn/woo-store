'use strict';

import React, { Component } from 'react';
import { View, ListView } from 'react-native';

import Loading from '../../../components/Loading';
import CustomText from '../../../components/CustomText';
import styles from './ReviewTab_Style.js';
import ReviewItem from './ListItem/ReviewItem.js';

export default class ReviewTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }

  renderContent() {
    const { reviews, isFetching } = this.props.product;
    
    if (isFetching) {
      return (<Loading />);
    }

    if (this.props.message && this.props.message.length > 0) {
      return (<CustomText style={styles.message}> {this.props.message}</CustomText>);
    }

    if (!reviews || !reviews.length) {
      return (<CustomText style={styles.message}> No have reviews</CustomText>);
    }
    if (reviews && reviews.length > 0) {
      var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      return (
        <ListView
          style={styles.list}
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(reviews)}
          renderRow={(rowData) => <ReviewItem review={rowData} />} />
      );
    }
  }
}

