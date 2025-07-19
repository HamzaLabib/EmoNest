//////////////////////////
// Still Under Test Phase
//////////////////////////

import { useState } from 'react';
import replies from '../data/chatbotData.json';
import { speak } from '../scripts/speechUtils';
import { startRecording, stopRecording } from '../scripts/audioUtils';

const useChatbot = () => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

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

  return {
    conversation,
    userInput,
    setUserInput,
    handleSend,
    handleMoodSelect,
    toggleRecording,
    isRecording
  };
};

export default useChatbot;
