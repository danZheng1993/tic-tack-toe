import React from 'react';
import { View, StyleSheet } from 'react-native';

import Cell from './Cell';

export default ({ row, rowIndex }) => (
  <View style={styles.wrapper}>
    {row.map((cell, index) => <Cell cell={cell} rowIndex={rowIndex} colIndex={index} key={`${cell}_${rowIndex}_${index}`} />)}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
