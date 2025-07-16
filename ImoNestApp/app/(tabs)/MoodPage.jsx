import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveMoodToFile } from '../../scripts/storageUtils';
import moment from 'moment';
import moodData from '../../data/MoodData';
import MoodItem from '../../components/MoodScreen/MoodItem';

const MoodPage = () => {
  const navigation = useNavigation();

  const handleMoodSelect = async (mood) => {
    try {
      const storedHistory = await AsyncStorage.getItem('moodHistory');
      const moodHistory = storedHistory ? JSON.parse(storedHistory) : [];

      const moodToSave = {
        mood,
        dateTime: moment().format('DD/MM/YY HH:mm'),
      };

      const updatedHistory = [moodToSave, ...moodHistory].slice(0, 6);
      await AsyncStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
      await saveMoodToFile(moodToSave);
    } catch (error) {
      console.error('Failed to save mood:', error);
    }

    if (Platform.OS === 'web') {
      const choice = window.prompt(
        `For feeling "${mood}", type 'movie' or 'story'`
      );

      if (choice === 'movie') {
        navigation.navigate('VideoScreen', { mood: mood.toLowerCase() });
      } else if (choice === 'story') {
        navigation.navigate('StoryScreen', { mood: mood.toLowerCase() });
      }
    } else {
      Alert.alert(
        'Pick an activity',
        `For feeling "${mood}"`,
        [
          {
            text: 'Watch Movie 📺',
            onPress: () => navigation.navigate('VideoScreen', { mood: mood.toLowerCase() }),
          },
          {
            text: 'Read Story 📖',
            onPress: () => navigation.navigate('StoryScreen', { mood: mood.toLowerCase() }),
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Let’s check in {"\n\n"}What feeling is visiting you today?
      </Text>
      <FlatList
        data={moodData}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <MoodItem
            label={item.label}
            image={item.image}
            onPress={() => handleMoodSelect(item.label)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default MoodPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2C2C2C',
    textAlign: 'center',
    marginTop: '20'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: 24,
    columnGap: 20,
    paddingHorizontal: 20,
  },
});
