import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { resetBoard, useBoardDispatch, useBoardState } from '../../contexts/boardContext';

import Row from './Row';

export default () => {
  const { board, status, winner } = useBoardState();
  const dispatch = useBoardDispatch();
  React.useEffect(() => {
    if (status === 'finished' && winner) {
      Alert.alert(
        'Congratulations',
        `Player ${winner} won`,
        [
          { text: 'Restart', onPress: () => dispatch(resetBoard()) }
        ]
      );
    } else if (status === 'finished') {
      Alert.alert(
        'Draw',
        `You are drawn`,
        [
          { text: 'Restart', onPress: () => dispatch(resetBoard()) }
        ]
      );
    }
  }, [status, winner]);
  return (
    <View style={style.wrapper}>
      {board.map((row, index) => <Row row={row} rowIndex={index} key={`row_${index}`} />)}
    </View>
  )
};

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
