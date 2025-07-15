import * as FileSystem from 'expo-file-system';

const moodFilePath = FileSystem.documentDirectory + 'moodHistory.json';

export const saveMoodToFile = async (newMood) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(moodFilePath);
    let moodHistory = [];

    if (fileInfo.exists) {
      const existingData = await FileSystem.readAsStringAsync(moodFilePath);
      moodHistory = JSON.parse(existingData);
    }

    moodHistory.push(newMood);

    await FileSystem.writeAsStringAsync(moodFilePath, JSON.stringify(moodHistory));
    //console.log('Mood saved successfully to file');
  } catch (error) {
    console.error('Error saving mood to file:', error);
  }
};

export const getMoodHistoryFromFile = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(moodFilePath);

    if (fileInfo.exists) {
      const data = await FileSystem.readAsStringAsync(moodFilePath);
      return JSON.parse(data);
    }

    return [];
  } catch (error) {
    console.error('Error reading mood file:', error);
    return [];
  }
};
