import React from 'react';
import { FlatList, View } from 'react-native';
import MessageBubble from './/MessageBubble';

export default function ChatList({ conversation, flatListRef }) {
  return (
    <FlatList
      ref={flatListRef}
      data={conversation}
      renderItem={({ item }) => <MessageBubble message={item} />}
      keyExtractor={(_, i) => i.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      contentContainerStyle={{ paddingBottom: 10 }}
    />
  );
};
