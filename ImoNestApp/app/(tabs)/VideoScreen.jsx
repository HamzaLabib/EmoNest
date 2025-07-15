import React from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { videoSourceMap } from '../../data/VideoData';
import BackButton from '../../components/BackButton';

const VideoScreen = () => {
  const video = React.useRef(null);
  const route = useRoute();
  const { mood } = route.params;

  const videoSource = videoSourceMap[mood];

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.title}>{mood.toUpperCase()}</Text>
      {videoSource ? (
        <Video
          ref={video}
          source={videoSource}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          style={styles.video}
        />
      ) : (
        <Text style={styles.error}>Video not found for this mood.</Text>
      )}
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
