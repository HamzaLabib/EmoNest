import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const MoodItem = ({ label, image, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image source={image} style={styles.avatar} resizeMode="contain" />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 100,
    margin: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default MoodItem;
