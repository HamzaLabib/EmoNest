import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../scripts/authUtils/authContext';
import { loginUser } from '../../scripts/authUtils/authAPI';
import CustomInput from '../../components/CustomInput';

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
      await AsyncStorage.setItem(
        'userInfo',
        JSON.stringify({
          email,
          parentName: data.pName,
          childName: data.cName,
          age: data.age,
        })
      );
      
      setAuthenticated(true);
      router.replace('/');
    } catch (err) {
      console.error(err);
      Alert.alert('Login Failed', err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const Wrapper = Platform.OS === 'web'
  ? React.Fragment
  : TouchableWithoutFeedback;

  return (
    <Wrapper onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Image
          source={require('../../assets/photos/logos/logo6.png')}
          style={styles.logo}
          resizeMode="contain"
          />
        <Text style={styles.title}>EmoNest</Text>
        <CustomInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address"/>
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

        {/* Loading spinner */}
        <Modal transparent visible={loading} animationType="fade">
          <View style={styles.loadingSpinner}>
            <ActivityIndicator size="large" color="#f9946b" />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </Wrapper>
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
  loadingSpinner: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'Bold',
  },
});
