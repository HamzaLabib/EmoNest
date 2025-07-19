import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const MessageBubble = ({ message }) => {
  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: message.audio });
    await sound.playAsync();
  };

  return (
    <View
      style={[
        styles.bubble,
        message.sender === 'child' ? styles.child : styles.bot,
      ]}
    >
      <Text>{message.text}</Text>
      {message.audio && (
        <TouchableOpacity onPress={playAudio}>
          <Text style={{ color: '#007AFF' }}>🔊 Play Audio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  bubble: { padding: 10, margin: 6, borderRadius: 12, maxWidth: '75%' },
  child: { backgroundColor: '#DDF4FF', alignSelf: 'flex-end' },
  bot: { backgroundColor: '#FFF0D1', alignSelf: 'flex-start' },
});
