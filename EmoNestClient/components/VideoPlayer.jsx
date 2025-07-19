import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayer = ({ source, mood }) => {
  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mood.toUpperCase()}</Text>
      {source ? (
        <Video
          ref={video}
          source={source}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          style={styles.video}
        />
      ) : (
        <Text style={styles.error}>Video not found for this mood.</Text>
      )}
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
});
