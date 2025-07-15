import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../scripts/authUtils/authContext';
import { loginUser } from '../../scripts/authUtils/authAPI';
import CustomInput from '../../components/inputText';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      await AsyncStorage.setItem('userToken', data.token || 'dummyToken');
      setAuthenticated(true);
      router.replace('/');
    } catch (err) {
      console.error(err);
      Alert.alert('Login Failed', err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ImoNest</Text>
      <CustomInput value={email} onChangeText={setEmail} placeholder="Email" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => router.push('/auth/signup')}>
        No account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: '600', textAlign: 'center' },
  link: { color: 'blue', marginTop: 12, textAlign: 'center' },
});
