import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native';
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
      <Image
        source={require('../../assets/photos/logos/logo6.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>ImoNest</Text>
      <Text style={styles.title}>Create an Account</Text>
      <CustomInput value={email} onChangeText={setEmail} placeholder="Email" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Text style={styles.link}>
        Already have an account?{' '}
        <Text style={styles.linkBold} onPress={() => router.push('/auth/login')}>
          Login
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
    width: 200,
    height: 200,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
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
