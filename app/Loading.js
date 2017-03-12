import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.poemContainer}>
          <ActivityIndicator
             animating={this.props.animating}
             style={styles.activity}
             size="large"
             color="white"
           />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poemContainer: {
    flex: 1,
    backgroundColor: '#8db8e2',
  },
  activity: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 100
  }
});
