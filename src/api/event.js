import http from '../services/http';

export default class Event {
  static fetchEvent(page, perPage) {
    return http.get(`/tribe/events/v1/events?page=${page}&per_page=${perPage}`);
  }
  static fetchUpComing(page, perPage) {
    return http.get(`/tribe/events/v1/events?only_with_upcoming=true&page=${page}&per_page=${perPage}`);
  }
  static fetchEventDetail(id) {
    return http.get(`/tribe/events/v1/events/${id}`)
  }
  static fetcchVenues(page, perPage) {
    return http.get(`/tribe/events/v1/venues?page=${page}&per_page=${perPage}`);
  }
  static fetchSingers(page, perPage) {
    return http.get(`/tribe/events/v1/tags?page=${page}&per_page=${perPage}`);
  }
  static fetchEventBySinger(id) {
    return http.get(`/tribe/events/v1/events?tags=${id}`);
  }
}