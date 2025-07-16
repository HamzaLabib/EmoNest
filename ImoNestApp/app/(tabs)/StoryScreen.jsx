import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import stories from '../../data/storyData.json';
import StoryPage from '../../components/StoryScreen/StoryViewer';
import StoryController from '../../components/StoryScreen/StoryController';
import BackButton from '../../components/BackButton';

const StoryScreen = () => {
  const route = useRoute();
  const { mood } = route.params;
  const [page, setPage] = useState(0);

  const story = stories[mood] || ['Story Feature will come soon!'];

  const handleNext = () => {
    if (page < story.length - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />

      <ScrollView contentContainerStyle={styles.content}>
        <StoryPage text={story[page]} />
        <StoryController
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={page === 0}
          isLast={page === story.length - 1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e9',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
});
