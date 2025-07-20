import { useState, useEffect, useRef } from 'react';
import { Image } from 'react-native';

export default function useChat() {
  const [conversation, setConversation] = useState([]);
  const [replies, setReplies]         = useState(null);
  const [utils, setUtils]             = useState(null);
  const [recording, setRecording]     = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const flatListRef                   = useRef(null);

  // load data & utils
  useEffect(() => {
    const loadData = async () => {
      const [data, speech, audio] = await Promise.all([
        import('../data/chatbotData.json'),
        import('../scripts/speechUtils'),
        import('../scripts/audioUtils')
      ]);
      setReplies(data.default);
      setUtils({
        speak: speech.speak,
        startRecording: audio.startRecording,
        stopRecording: audio.stopRecording
      });
      // Prefetch logo image (for performance)
      Image.prefetch('../../assets/photos/logos/logo5.png');
    };
    loadData();
  }, []);

  // auto‑scroll on new message
  useEffect(() => {
    if (conversation.length && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [conversation]);

  const sendMessage = (text, sender = 'child') => {
    setConversation((prev) => [...prev, { sender, text }]);
  };

  const handleSend = (inputText) => {
    if (!inputText.trim()) return;
    const key = Object.keys(replies || {}).find((k) =>
      inputText.toLowerCase().includes(k)
    );
    const replyText = key
      ? replies[key].replies?.[Math.floor(Math.random() * replies[key].replies.length)] 
        || replies[key].reply
      : "I'm here to listen!";
    sendMessage(inputText, 'child');
    sendMessage(replyText, 'bot');
    utils?.speak?.(replyText);
  };

  const handleMoodSelect = (moodKey) => {
    const prompt = replies[moodKey].prompt;
    const reply  = replies[moodKey].replies?.[0] || replies[moodKey].reply;
    sendMessage(prompt, 'child');
    sendMessage(reply, 'bot');
    utils?.speak?.(reply);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await utils.stopRecording(recording, setConversation);
      setIsRecording(false);
      setRecording(null);
    } else {
      await utils.startRecording((rec) => {
        setRecording(rec);
        setIsRecording(true);
      });
    }
  };

  return {
    conversation,
    flatListRef,
    replies,
    utils,
    isRecording,
    handleSend,
    handleMoodSelect,
    toggleRecording
  };
};
