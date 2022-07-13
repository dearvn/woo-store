import { Animated, Easing } from 'react-native';

const DetailTransitionSpec = ({
  duration: 800,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing
});

const DetailTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [0, 1, 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange
  });

  const scaleX = position.interpolate({
    inputRange,
    outputRange
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange
  });

  return {
    opacity,
    transform: [
      { scaleX },
      { scaleY }
    ]
  };
};

export default TransitionConfiguration = () => ({
  transitionSpec: DetailTransitionSpec,
  screenInterpolator: (sceneProps) => {
    const { position, scene } = sceneProps;
    const { index, route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'detailTransition';

    return {
      detailTransition: DetailTransition(index, position),
      default: null
    }[transition];
  }
});

