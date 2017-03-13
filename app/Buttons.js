import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';

export default class Buttons extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor='#407dc5'
          onPress={this.fetchPoem}>
          <Text style={styles.buttonText}>🔀</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor='#407dc5'
          onPress={this.fetchPoem}>
          <Text style={styles.buttonText}>📖</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    width: window.width / 2,
    backgroundColor: '#407dc5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: "Futura"
  },
});
