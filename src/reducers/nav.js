import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigator';
import { VERSION } from '../utils/general';

const getNestedRouteAction = (prevRoute) => {
  if (_.get(prevRoute, 'routes.length')) {
    return getNestedRouteAction(prevRoute.routes[prevRoute.index]);
  }
  return prevRoute;
};

export default function (state, action) {
  let nextState, currentState, currentPage;

  if (action.type.startsWith('Navigation/') && action.type !== 'Navigation/SET_PARAMS') {
    const { routeName } = action;
    const prevWrappedStack = state.routes[state.index];
    const prevNestedRouteAction = getNestedRouteAction(prevWrappedStack);
    if (routeName === prevNestedRouteAction.routeName) return state;

    currentState = AppNavigator.router.getStateForAction(action, state);
    currentPage = _.get(getNestedRouteAction(currentState), 'routeName');
    return { ...currentState, currentPage };
  }

  const version = _.get(state, 'appVersion', VERSION);

  switch (action.type) {
    case 'NAV_HOME':
    case 'USER_LOGIN_SUCCESS':
      currentState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: version === 1 ? 'MainNavigator' : 'MainNavigatorV2' })
          ]
        }),
        state
      );

      currentPage = _.get(getNestedRouteAction(currentState), 'routeName');
      nextState = { ...currentState, currentPage };

      break;

    case 'USER_LOGOUT_SUCCESS':
      currentState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: version === 1 ? 'SignIn' : 'WelcomeV2' })
          ]
        }),
        state
      );
      currentPage = _.get(getNestedRouteAction(currentState), 'routeName');
      nextState = { ...currentState, currentPage };
      break;

    case 'CHANGE_APP_VERSION':
      nextState = { ...state, appVersion: action.payload.version };

      break;
    default:
      if (action.type.startsWith('Navigation/')) {
        const { routeName } = action;
        const prevWrappedStack = state.routes[state.index];
        const prevNestedRouteAction = getNestedRouteAction(prevWrappedStack);

        if (routeName === prevNestedRouteAction.routeName) return state;
      }

      nextState = AppNavigator.router.getStateForAction(action, state);

      break;
  }

  return nextState || state;
}
