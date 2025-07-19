import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MoodButtons = ({ moods, onSelect }) => (
  <View style={styles.container}>
    {Object.keys(moods).map((key) => (
      <TouchableOpacity
        key={key}
        onPress={() => onSelect(key)}
        style={styles.button}
      >
        <Text style={styles.text}>{key}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default MoodButtons;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  button: { backgroundColor: '#6C9EFF', padding: 10, margin: 5, borderRadius: 8 },
  text: { color: '#fff' },
});
