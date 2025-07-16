import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../scripts/authUtils/authContext';
import { loginUser } from '../../scripts/authUtils/authAPI';
import CustomInput from '../../components/inputText';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      await AsyncStorage.setItem('userToken', data.token || 'dummyToken');
      setAuthenticated(true);
      router.replace('/');
    } catch (err) {
      console.error(err);
      Alert.alert('Login Failed', err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/photos/logos/logo6.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>ImoNest</Text>
      <CustomInput value={email} onChangeText={setEmail} placeholder="Email" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.link}>
        No account?{' '}
        <Text style={styles.linkBold} onPress={() => router.push('/auth/signup')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 222,
    height: 222,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4b2e2e',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#f9946b',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    fontSize: 14,
    color: '#5a3d3d',
  },
  linkBold: {
    fontWeight: '600',
    color: '#a3543d',
  },
});
