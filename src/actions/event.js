import _ from 'lodash';
import { createActions } from 'redux-actions';
import Api from '../api';
import { LIMIT_PER_PAGE } from '../constants/defaultValues'

const { fetchEventRequest, fetchEventSuccess, fetchEventFailure } = createActions({
  'FETCH_EVENT_REQUEST': () => {},
  'FETCH_EVENT_SUCCESS': (events, page, total) => ({ events, page, total }),
  'FETCH_EVENT_FAILURE': error => ({ error })
});

export const fetchEvent = (page = 1, perPage = LIMIT_PER_PAGE) => dispatch => {
  dispatch(fetchEventRequest());

  return Api.Event.fetchEvent(page, perPage)
    .then(({ data }) => {
      const events = _.get(data, 'events', []);
      const total = _.get(data, 'total_pages', 1);
      dispatch(fetchEventSuccess(events, page, total));
    })
    .catch(error => {
      dispatch(fetchEventFailure(error));
    });
};

const { fetchUpComingRequest, fetchUpComingSuccess, fetchUpComingFailure } = createActions({
  'FETCH_UP_COMING_REQUEST': () => {},
  'FETCH_UP_COMING_SUCCESS': (events, page, total) => ({ events, page, total }),
  'FETCH_UP_COMING_FAILURE': error => ({ error })
});

export const fetchUpComing = (page = 1, perPage = LIMIT_PER_PAGE) => dispatch => {
  dispatch(fetchUpComingRequest());

  return Api.Event.fetchUpComing(page, perPage)
    .then(({ data }) => {
      const events = _.get(data, 'events', []);
      const total = _.get(data, 'total_pages', 1);
      dispatch(fetchUpComingSuccess(events, page, total));
    })
    .catch(error => {
      dispatch(fetchUpComingFailure(error));
    });
};

const { fetchVenuesRequest, fetchVenuesSuccess, fetchVenuesFailure } = createActions({
  'FETCH_VENUES_REQUEST': () => {},
  'FETCH_VENUES_SUCCESS': (venues, page, total) => ({ venues, page, total }),
  'FETCH_VENUES_FAILURE': error => ({ error })
});

export const fetchVenues = (page = 1, perPage = LIMIT_PER_PAGE) => dispatch => {
  dispatch(fetchVenuesRequest());

  return Api.Event.fetcchVenues(page, perPage)
    .then(({ data }) => {
      const venues = _.get(data, 'venues', []);
      const total = _.get(data, 'total_pages', 1);
      dispatch(fetchVenuesSuccess(venues, page, total));
    })
    .catch(error => {
      dispatch(fetchVenuesFailure(error));
    });
};
const { fetchSingersRequest, fetchSingersSuccess, fetchSingersFailure } = createActions({
  'FETCH_SINGERS_REQUEST': () => {},
  'FETCH_SINGERS_SUCCESS': (singers, page, total) => ({ singers, page, total }),
  'FETCH_SINGERS_FAILURE': error => ({ error })
});

export const fetchSingers = (page = 1, perPage = LIMIT_PER_PAGE) => dispatch => {
  dispatch(fetchSingersRequest());

  return Api.Event.fetchSingers(page, perPage)
    .then(({ data }) => {
      const singers = _.get(data, 'tags', []);
      const total = _.get(data, 'total_pages', 1);
      dispatch(fetchSingersSuccess(singers, page, total));
    })
    .catch(error => {
      dispatch(fetchSingersFailure(error));
    });
};

const { fetchEventDetailRequest, fetchEventDetailSuccess, fetchEventDetailFailure } = createActions({
  'FETCH_EVENT_DETAIL_REQUEST': () => {},
  'FETCH_EVENT_DETAIL_SUCCESS': (data) => ({ data }),
  'FETCH_EVENT_DETAIL_FAILURE': (error) => ({ error })
});

export const fetchEventDetail = (id) => dispatch => {
  dispatch(fetchEventDetailRequest());
  return Api.Event.fetchEventDetail(id)
    .then(({data}) => {
      dispatch(fetchEventDetailSuccess(data));
    })
    .catch(error => {
      dispatch(fetchEventDetailFailure(error));
    });
};