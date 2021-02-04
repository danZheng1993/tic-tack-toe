import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Board } from './components';
import { BoardProvider } from './contexts/boardContext';

export default function App() {
  return (
    <View style={styles.container}>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
