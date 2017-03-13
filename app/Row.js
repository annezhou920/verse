import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Row = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.image}} style={styles.photo} />
    <Text style={styles.text}>
      {props.poet}
    </Text>
  </View>
);

export default Row;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    color: 'white',
    fontFamily: 'Futura'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 30
  },
});
