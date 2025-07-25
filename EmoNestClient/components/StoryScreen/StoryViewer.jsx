import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { storyImages } from '../../data/StoryImages';

const StoryViewer = ({ text, image }) => {
  const imageSource = image && storyImages?.[image];

  return (
    <View style={styles.wrapper}>
      {imageSource && (
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.pageText}>{text}</Text>
    </View>
  );
};

export default StoryViewer;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  pageText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 30,
  },
});
