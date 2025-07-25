import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  Alert,
  BackHandler,
  Button,
  ToastAndroid,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalExample from '../../components/ModalExample';
import ChildInfo from '../../components/ProfileScreen/ChildInfo';

const ChildProfile = () => {
  const avatarSource = require('../../assets/photos/happy.png');
  const [modalVisible, setModalVisible] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [childInfo, setChildInfo] = useState({ childName: '', age: '' });
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('userInfo');
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setChildInfo(parsed);
          }
        } catch (error) {
          console.error('Failed to load user info:', error);
        }
      };

      const fetchMoodHistory = async () => {
        try {
          const storedHistory = await AsyncStorage.getItem('moodHistory');
          if (storedHistory) {
            const parsed = JSON.parse(storedHistory);
            setMoodHistory(parsed);
          }
        } catch (error) {
          console.error('Failed to load mood history:', error);
        }
      };

      fetchUserInfo();
      fetchMoodHistory();

      if (Platform.OS === 'android') {
        const backAction = () => {
          Alert.alert('Hold on!', 'Do you want to exit?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
      }
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Child Profile</Text>
      <Image
        source={require('../../assets/photos/logos/logo0.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ChildInfo
        avatar={avatarSource}
        name={childInfo.childName || 'Child'}
        age={childInfo.age || 'Age'}
      />

      <Text style={styles.subHeader}>Recent Moods</Text>
      {moodHistory.length === 0 ? (
        <Text style={styles.noMood}>No mood history yet.</Text>
      ) : (
        moodHistory.map((entry, index) => (
          <Text key={index} style={styles.moodEntry}>
            • {entry.mood}
          </Text>
        ))
      )}

      {Platform.OS === 'android' && (
        <Button title="Show Toast" onPress={() => ToastAndroid.show('Hello from Android', ToastAndroid.SHORT)} />
      )}
    </SafeAreaView>
  );
};

export default ChildProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e9',
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 90,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 20,
  },
  subHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  moodEntry: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
  noMood: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
