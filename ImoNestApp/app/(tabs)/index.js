import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image
} from 'react-native';
import MessageBubble from '../../components/HomeScreen/MessageBubble';
import MoodButtons from '../../components/HomeScreen/MoodButtons';
import replies from '../../data/chatbotData.json';
import { startRecording, stopRecording } from '../../scripts/audioUtils';
import { speak } from '../../scripts/speechUtils';
import { useAuth } from '../../scripts/authUtils/authContext';

const ChatbotScreen = () => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const { logout } = useAuth();

  const getReply = (emotion) => {
    const entry = replies[emotion];
    if (!entry) return "Hmm, I’m not sure how to respond to that yet.";
    const replyArray = entry.replies || [entry.reply];
    const randomIndex = Math.floor(Math.random() * replyArray.length);
    return replyArray[randomIndex];
  };

  const handleMoodSelect = (moodKey) => {
    const mood = replies[moodKey];
    if (!mood) return;
    const randomReply = getReply(moodKey);

    setConversation((prev) => [
      ...prev,
      { sender: 'child', text: mood.prompt },
      { sender: 'bot', text: randomReply },
    ]);
    speak(randomReply);
  };

  const handleSend = () => {
    if (!userInput.trim()) return;
    const input = userInput.trim().toLowerCase();
    const matchedKey = Object.keys(replies).find((key) =>
      input.includes(key)
    );
    const botReply = matchedKey
      ? getReply(matchedKey)
      : "I'm not sure how to respond to that, but I'm here to listen!";

    setConversation((prev) => [
      ...prev,
      { sender: 'child', text: userInput },
      { sender: 'bot', text: botReply },
    ]);
    speak(botReply);
    setUserInput('');
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording(recording, setConversation);
      setIsRecording(false);
      setRecording(null);
    } else {
      await startRecording((rec) => {
        setRecording(rec);
        setIsRecording(true);
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Emotions Nest</Text>
      </View>

      <Image
        source={require('../../assets/photos/logos/logo5.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <FlatList
        data={conversation}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      <MoodButtons moods={replies} onSelect={handleMoodSelect} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Every feeling is okay, what are they telling you today?"
        />
      </View>

      <View style={styles.sendLine}>
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleRecording} style={styles.micButton}>
          <Text style={styles.sendText}>{isRecording ? 'Stop' : '🎤'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e9',
    paddingTop: 60,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: '20'
  },
  logoutButton: {
    padding: 6,
    backgroundColor: '#ffe0e0',
    borderRadius: 8,
  },
  logoutText: {
    color: '#d00',
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 6,
  },
  sendLine: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#6C9EFF',
    padding: 10,
    borderRadius: 20,
    marginRight: 5,
  },
  micButton: {
    backgroundColor: '#FFB94E',
    padding: 10,
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
