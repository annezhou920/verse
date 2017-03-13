import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

const Photo = (props) => (
  <View style={styles.container}>
      <Image
        source={props.source}
        style={styles.image}>
      </Image>
  </View>
)

export default Photo

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8db8e2',
  },
  image: {
    width: window.width,
    height: 150,
    resizeMode: 'cover',
    alignItems: 'center'
  },
});
