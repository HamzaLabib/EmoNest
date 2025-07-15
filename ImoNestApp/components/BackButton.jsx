import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
      <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  backText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
});
