import React, { useState } from 'react';
import { View, Image, ActivityIndicator, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useAuth } from '../../scripts/authUtils/authContext';
import useChat from '../../hooks/useChat';
import ChatHeader from '../../components/HomeScreen/ChatHeader';
import ChatList from '../../components/HomeScreen/ChatList';
import MoodButtons from '../../components/HomeScreen//MoodButtons';
import ChatInputBar from '../../components/HomeScreen/ChatInputBar';

export default function ChatbotScreen() {
  const [userInput, setUserInput] = useState('');
  const { logout } = useAuth();
  const {
    conversation,
    flatListRef,
    replies,
    isRecording,
    handleSend,
    handleMoodSelect,
    toggleRecording
  } = useChat();

  if (!replies) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f9946b" />
        <Text style={styles.loadingText}>Getting your nest ready...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ChatHeader onLogout={logout} />
      <Image source={require('../../assets/photos/logos/logo5.png')} style={styles.logo} />
      <ChatList conversation={conversation} flatListRef={flatListRef} />
      <MoodButtons moods={replies} onSelect={handleMoodSelect} />
      <ChatInputBar
        userInput={userInput}
        setUserInput={setUserInput}
        onSend={() => {
          handleSend(userInput)
          setUserInput('')
        }}
        onToggleRecord={toggleRecording}
        isRecording={isRecording}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e9',
    paddingTop: 60,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3e9',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  }
});
