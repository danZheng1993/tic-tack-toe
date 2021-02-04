import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { setCell, useBoardDispatch, useBoardState } from '../../contexts/boardContext';

export default ({ cell, rowIndex, colIndex }) => {
  const dispatch = useBoardDispatch();
  const { winningSquares } = useBoardState();
  const handlePress = React.useCallback(() => {
    if (!cell) {
      dispatch(setCell(rowIndex, colIndex));
    }
  }, [rowIndex, colIndex, cell]);
  const isWinningCell = React.useMemo(() => {
    if (winningSquares.find(cell => cell[0] === rowIndex && cell[1] === colIndex)) {
      return true;
    }
    return false;
  }, [winningSquares, rowIndex, colIndex]);
  return (
    <TouchableOpacity style={[styles.wrapper, isWinningCell && styles.winner]} onPress={handlePress}>
      <Text>{cell}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  winner: {
    backgroundColor: 'green',
  }
});
