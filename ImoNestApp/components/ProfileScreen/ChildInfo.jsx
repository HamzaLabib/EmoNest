import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ChildInfo = ({ avatar, name, age, favoriteColor, calmingActivity }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}, {age} years old</Text>
    <Image source={avatar} style={styles.avatar} />
    <Text style={styles.info}>Favorite Color: {favoriteColor}</Text>
    <Text style={styles.info}>Preferred Calming Activity: {calmingActivity}</Text>
  </View>
);

export default ChildInfo;

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: '600', color: '#333' },
  info: { fontSize: 16, color: '#555', marginVertical: 4 },
});
