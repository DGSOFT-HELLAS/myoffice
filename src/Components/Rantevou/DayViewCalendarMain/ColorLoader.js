import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const ColorLoader = ({ loading }) => {
  const loadingProgress = useRef(new Animated.Value(0)).current;
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    startAnimation();
    return () => {
      animation && animation.stop();
    };
  }, []);

  const startAnimation = () => {
    const newAnimation = Animated.timing(loadingProgress, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    });
    setAnimation(newAnimation);
    newAnimation.start(() => {
      loadingProgress.setValue(0);
      startAnimation();
    });
  };

  const colorLoading = loadingProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255, 255, 255)', 'rgb(0, 255, 0)'],
  });

  const transform = [
    {
      translateX: loadingProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200],
      }),
    },
  ];

  return (
    <>

      <View style={styles.container}>
        {loading && <Animated.View style={[styles.loadingBar, { backgroundColor: colorLoading, transform }]} />}
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 3,
  },
  loadingBar: {
    width: 200,
    height: 3,
    borderRadius: 2,
  },
});

export default ColorLoader;