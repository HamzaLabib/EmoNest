import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../../scripts/authUtils/authAPI';
import CustomInput from '../../components/inputText';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const data = await registerUser(email, password);
      Alert.alert('Success', data.message || 'Account created!');
      router.replace('/auth/login');
    } catch (err) {
      console.error(err);
      Alert.alert('Signup Failed', err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <CustomInput value={email} onChangeText={setEmail} placeholder="Email" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: '600', textAlign: 'center' },
});
