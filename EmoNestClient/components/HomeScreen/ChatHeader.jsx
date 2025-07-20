import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChatHeader({ onLogout }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Emotions Nest</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  logoutButton: {
    padding: 6,
    backgroundColor: '#ffe0e0',
    borderRadius: 11,
    alignSelf: 'flex-end'
  },
  logoutText: {
    color: '#d00',
    fontWeight: 'bold',
  },
});
