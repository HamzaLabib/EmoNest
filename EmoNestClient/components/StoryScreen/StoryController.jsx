import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StoryController = ({ onNext, onPrev, isFirst, isLast }) => (
  <View style={styles.controls}>
    <TouchableOpacity onPress={onPrev} disabled={isFirst} style={styles.button}>
      <Text style={styles.buttonText}>◀ Prev</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onNext} disabled={isLast} style={styles.button}>
      <Text style={styles.buttonText}>Next ▶</Text>
    </TouchableOpacity>
  </View>
);

export default StoryController;

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 20,
  },
  button: {
    backgroundColor: '#F6B84E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
