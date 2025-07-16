import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, Text, StyleSheet, FlatList, Image } from 'react-native';
import { getMoodHistoryFromFile } from '../../scripts/storageUtils';
import parentData from '../../data/parentChildData.json';

const ParentDashboard = () => {
  const parentId = 'parent123';
  const childId = parentData.parents[parentId].children[0];
  const child = parentData.children[childId];

  const [moodHistory, setMoodHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchMoodHistory = async () => {
        try {
          const data = await getMoodHistoryFromFile();
          setMoodHistory(data);
        } catch (error) {
          console.error('Failed to load mood history:', error);
        }
      };

      fetchMoodHistory();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Parent Dashboard</Text>
      <Image
        source={require('../../assets/photos/logos/logo4a.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome, {child.name} Parent!</Text>
      <Text style={styles.subtitle}>Child: {child.name}, Age: {child.age}</Text>

      <Text style={styles.section}>Mood History</Text>
      <FlatList
        data={[...moodHistory].slice(0, 28)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item?.dateTime ?? 'Unknown Time'} –{' '}
            <Text style={{ fontWeight: 'bold' }}>{item?.mood ?? 'Unknown Mood'}</Text>
          </Text>

        )}
      />
    </SafeAreaView>
  );
};

export default ParentDashboard;

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20, backgroundColor: '#fff3e9', flex: 1 },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: '80' },
  header: { fontSize: 26, fontWeight: '700', color: '#2C2C2C', marginTop: '20' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  section: { fontSize: 20, fontWeight: '600', marginTop: 20 },
  item: { fontSize: 16, marginVertical: 6, alignSelf: 'center'},
});
