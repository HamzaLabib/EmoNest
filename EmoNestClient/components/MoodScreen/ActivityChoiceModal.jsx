import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

const ActivityChoiceModal = ({ visible, mood, onChoice, onClose }) => {
  if (!visible || !mood) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>For feeling "{mood}", pick an activity:</Text>
          <button onClick={() => onChoice('movie')} style={styles.button}>
            Watch Movie 📺
          </button>
          <button onClick={() => onChoice('story')} style={styles.button}>
            Read Story 📖
          </button>
          <button onClick={onClose} style={styles.button}>
            Close
          </button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: '10px',
    margin: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
});

export default ActivityChoiceModal;
