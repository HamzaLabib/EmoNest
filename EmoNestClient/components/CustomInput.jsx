import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = 'none',
  validate,
  keyboardType = 'default',
}) {
  const [error, setError] = useState(null);

  const handleBlur = () => {
    if (validate) {
      const err = validate(value);
      setError(err);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          if (error) setError(null); // clear error as they type
        }}
        placeholder={placeholder}
        placeholderTextColor="#bbaaaa"
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoComplete="off"
        autoCorrect={false}
        keyboardType={keyboardType}
        onBlur={handleBlur}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0cfc0',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginLeft: 6,
    fontSize: 12,
  },
});
