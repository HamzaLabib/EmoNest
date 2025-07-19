import { Audio } from 'expo-av';

let isRecording = false;
let currentRecording = null;

export async function startRecording(setRecording) {
  if (isRecording) return;

  const { status } = await Audio.requestPermissionsAsync();
  if (status !== 'granted') return;

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  const { recording } = await Audio.Recording.createAsync(
    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
  );

  currentRecording = recording;
  setRecording(recording);
  isRecording = true;
}

export async function stopRecording(recording, setConversation) {
  if (!isRecording || !recording) return;

  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  isRecording = false;
  currentRecording = null;

  setConversation((prev) => [
    ...prev,
    { sender: 'child', text: '🎤 Sent a voice message', audio: uri },
  ]);

  const { sound } = await Audio.Sound.createAsync({ uri });
  await sound.playAsync();
}
