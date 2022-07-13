import { handleActions } from 'redux-actions';
import _ from 'lodash';

const initialState = {
  fetchEvent: {
    status: '',
    result: [],
    error: null,
    requesting: false,
    page: 0,
    canLoadMore: true
  },
  fetchUpComing: {
    status: '',
    result: [],
    error: null,
    requesting: false,
    page: 0,
    canLoadMore: true
  },
  fetchVenues: {
    status: '',
    result: [],
    error: null,
    requesting: false,
    page: 0,
    canLoadMore: true
  },
  fetchSingers: {
    status: '',
    result: [],
    error: null,
    requesting: false,
    page: 0,
    canLoadMore: true
  },
  eventDetail: {
    status: '',
    result: null,
    error: null,
    requesting: false
  }
};

const event = handleActions({
  ['FETCH_EVENT_REQUEST']: (state, { payload }) => ({
    ...state,
    fetchEvent: {
      ...state.fetchEvent,
      requesting: true,
      status: ''
    }
  }),
  ['FETCH_EVENT_SUCCESS']: (state, { payload }) => ({
    ...state,
    fetchEvent: {
      ...state.fetchEvent,
      status: 'success',
      requesting: false,
      result: payload.page > 1 ? [...state.fetchEvent.result, ...payload.events] : payload.events,
      page: payload.page,
      canLoadMore: (payload.page > payload.total)
    }
  }),
  ['FETCH_EVENT_FAILURE']: (state, { payload }) => ({
    ...state,
    fetchEvent: {
      ...state.fetchEvent,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  ['FETCH_UP_COMING_REQUEST']: (state, { payload }) => ({
    ...state,
    fetchUpComing: {
      ...state.fetchUpComing,
      requesting: true,
      status: ''
    }
  }),
  ['FETCH_UP_COMING_SUCCESS']: (state, { payload }) => ({
    ...state,
    fetchUpComing: {
      ...state.fetchUpComing,
      status: 'success',
      requesting: false,
      result: payload.page > 1 ? [...state.fetchUpComing.result, ...payload.events] : payload.events,
      page: payload.page,
      canLoadMore: (payload.page > payload.total)
    }
  }),
  ['FETCH_UP_COMING_FAILURE']: (state, { payload }) => ({
    ...state,
    fetchUpComing: {
      ...state.fetchUpComing,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  ['FETCH_VENUES_REQUEST']: (state, { payload }) => ({
    ...state,
    fetchVenues: {
      ...state.fetchVenues,
      requesting: true,
      status: ''
    }
  }),
  ['FETCH_VENUES_SUCCESS']: (state, { payload }) => ({
    ...state,
    fetchVenues: {
      ...state.fetchVenues,
      status: 'success',
      requesting: false,
      result: payload.page > 1 ? [...state.fetchVenues.result, ...payload.venues] : payload.venues,
      page: payload.page,
      canLoadMore: (payload.page > payload.total)
    }
  }),
  ['FETCH_VENUES_FAILURE']: (state, { payload }) => ({
    ...state,
    fetchVenues: {
      ...state.fetchVenues,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  ['FETCH_SINGERS_REQUEST']: (state, { payload }) => ({
    ...state,
    fetchSingers: {
      ...state.fetchSingers,
      requesting: true,
      status: ''
    }
  }),
  ['FETCH_SINGERS_SUCCESS']: (state, { payload }) => ({
    ...state,
    fetchSingers: {
      ...state.fetchSingers,
      status: 'success',
      requesting: false,
      result: payload.page > 1 ? [...state.fetchSingers.result, ...payload.singers] : payload.singers,
      page: payload.page,
      canLoadMore: (payload.page > payload.total)
    }
  }),
  ['FETCH_SINGERS_FAILURE']: (state, { payload }) => ({
    ...state,
    fetchSingers: {
      ...state.fetchSingers,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  ['FETCH_EVENT_DETAIL_REQUEST']: (state, { payload }) => ({
    ...state,
    eventDetail: {
      ...initialState.eventDetail,
      requesting: true
    }
  }),
  ['FETCH_EVENT_DETAIL_SUCCESS']: (state, { payload }) => ({
    ...state,
    eventDetail: {
      ...state.eventDetail,
      requesting: false,
      status: 'success',
      result: payload.data
    }
  }),
  ['FETCH_EVENT_DETAIL_FAILURE']: (state, { payload }) => ({
    ...state,
    eventDetail: {
      ...state.eventDetail,
      requesting: false,
      status: 'error',
      error: payload.error
    }
  }),
}, initialState);

export default event;
