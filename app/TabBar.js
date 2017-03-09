import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import poems from './poems.js'

class FavoritesScreen extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      // icon: ({ tintColor }) => (
      //   <Image
      //     source={require('./chats-icon.png')}
      //     style={[styles.icon, {tintColor: tintColor}]}
      //   />
      // ),
    },
    title: 'Favorites'
  }
  render() {
    return <Text>List of favorite poems</Text>
  }
}

class VerseScreen extends Component {
  // static navigationOptions = {
  //   title: 'Verse'
  // }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.welcome}>
          {poems[0].title}
          {'\n'}
          {poems[0].poet}
        </Text>
        <Text style={styles.text}>
          {poems[0].verse}
        </Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              underlayColor='#ccc'
            >
              <Text style={styles.buttonText}>Hmmmmm...</Text>
            </TouchableHighlight>
          </View>
      </ScrollView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer: {
    bottom: 0,
    flex: .1,
    backgroundColor: '#eee',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: '#666666',
  },
});

const MainScreenNavigator = TabNavigator({
  // Favorites: { screen: FavoritesScreen },
  Verses: { screen: VerseScreen },
});

export default MainScreenNavigator
