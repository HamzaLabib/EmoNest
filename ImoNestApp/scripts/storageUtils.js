import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const moodFilePath = FileSystem.documentDirectory + 'moodHistory.json';

export const saveMoodToFile = async (newMood) => {
  try {
    let moodHistory = [];

    if (Platform.OS === 'web') {
      const existing = localStorage.getItem('moodHistory');
      moodHistory = existing ? JSON.parse(existing) : [];
    } else {
      const fileInfo = await FileSystem.getInfoAsync(moodFilePath);
      if (fileInfo.exists) {
        const existingData = await FileSystem.readAsStringAsync(moodFilePath);
        moodHistory = JSON.parse(existingData);
      }
    }

    // Avoid adding duplicate mood with exact same timestamp
    if (
      moodHistory.length === 0 ||
      moodHistory[0].dateTime !== newMood.dateTime
    ) {
      moodHistory.unshift(newMood); // add new mood to the beginning
    }

    const trimmed = moodHistory.slice(0, 6); // keep only latest 6

    if (Platform.OS === 'web') {
      localStorage.setItem('moodHistory', JSON.stringify(trimmed));
    } else {
      await FileSystem.writeAsStringAsync(moodFilePath, JSON.stringify(trimmed));
    }
  } catch (error) {
    console.error('Error saving mood:', error);
  }
};

export const getMoodHistoryFromFile = async () => {
  try {
    if (Platform.OS === 'web') {
      const existing = localStorage.getItem('moodHistory');
      return existing ? JSON.parse(existing) : [];
    } else {
      const fileInfo = await FileSystem.getInfoAsync(moodFilePath);

      if (fileInfo.exists) {
        const data = await FileSystem.readAsStringAsync(moodFilePath);
        return JSON.parse(data);
      }

      return [];
    }
  } catch (error) {
    console.error('Error loading mood history:', error);
    return [];
  }
};
