import {createAction} from 'redux-actions';

const navHome = createAction('NAV_HOME');
export const resetHome = () => (dispatch) => {
  dispatch(navHome());
};

const changeAppVersion = createAction('CHANGE_APP_VERSION');
export const changeApp = (version) => (dispatch) => {
  dispatch(changeAppVersion({ version }));
};
