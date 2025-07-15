import React from 'react';
import { Text, StyleSheet } from 'react-native';

const StoryViewer = ({ text }) => (
  <Text style={styles.pageText}>{text}</Text>
);

export default StoryViewer;

const styles = StyleSheet.create({
  pageText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 30,
  },
});
