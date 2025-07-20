import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ChatInputBar({
  userInput,
  setUserInput,
  onSend,
  onToggleRecord,
  isRecording
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Every feeling is okay..."
      />
      <TouchableOpacity onPress={onSend} style={styles.sendButton}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggleRecord} style={styles.micButton}>
        <Text style={styles.sendText}>{isRecording ? 'Stop' : '🎤'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 6,
    paddingRight: 6,
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
  sendLine: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
