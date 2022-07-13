import _ from 'lodash';
import axios from 'axios';
import { FBLoginManager } from 'react-native-facebook-login';

FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);

const http = axios.create({
  headers: { mobile: true }
});

http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

http.interceptors.response.use(
  response => response,
  error => Promise.reject({ ...error })
);

export const Facebook = {
  login() {
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions(['email', 'public_profile'], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },

  logout() {
    FBLoginManager.logout(error => !error);
  }
};
