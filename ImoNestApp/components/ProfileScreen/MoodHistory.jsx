import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoodHistory = ({ moods }) => (
  <View>
    <Text style={styles.subHeader}>Mood History:</Text>
    {moods.map((mood, index) => (
      <Text key={index} style={styles.moodEntry}>• {mood}</Text>
    ))}
  </View>
);

export default MoodHistory;

const styles = StyleSheet.create({
  subHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  moodEntry: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
});
