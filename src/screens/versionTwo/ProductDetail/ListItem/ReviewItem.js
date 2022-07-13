import React, { Component } from 'react';
import {
  View
} from 'react-native';
import styles from './ReviewItem_Style.js';
import Rating from '../../../../components/Rating';
import CustomText from '../../../../components/CustomText';
import moment from 'moment';

export default class ReviewItem extends Component {

  render() {
    let { review } = this.props;
    return (
      <View style={styles.container}>
        <View><CustomText style={styles.name}>{review.name}</CustomText></View>
        <View><CustomText style={styles.review}>{review.review}</CustomText></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomText style={styles.date_created}>{this.dateFormat(review.date_created)}</CustomText>
          <Rating rating={review.rating} style={styles.rating} />
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

  dateFormat(date) {
    return moment.parseZone(date).format('MMMM DD, YYYY, HH:mm');
  }
}
