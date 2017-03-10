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
import TabBar from './TabBar'


class VerseScreen extends Component {
  static navigationOptions = {
    title: 'Verse'
  }
  constructor(){
    super()
    this.state = {
      poem: {
        title: poems[0].title,
        poet: poems[0].poet,
        verse: poems[0].verse
      }
    }
    this.fetchPoem = this.fetchPoem.bind(this)
  }

  componentDidMount(){
    this.fetchPoem()
  }

  fetchPoem(){
    let min = 0
    let max = poems.length - 1
    let randomPoemNum = Math.floor(Math.random() * (max - min + 1)) + min;
    this.setState({
      poem: {
        title: poems[randomPoemNum].title,
        poet: poems[randomPoemNum].poet,
        verse: poems[randomPoemNum].verse
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>

            {this.state.poem.title}
          </Text>
          <Text style={styles.author}>

            {this.state.poem.poet}
          </Text>
          <Text style={styles.text}>

            {this.state.poem.verse}
          </Text>
        </ScrollView>

         <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#ccc'
            onPress={this.fetchPoem}>
            <Text style={styles.buttonText}>Shuffle</Text>
          </TouchableHighlight>
        </View>

      </View>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  author: {
    fontSize: 15,
    textAlign: 'center',
    // margin: 5,
  },
  text: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 50,
  },
  buttonContainer: {
    height: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#666666',
  },
});

const Verse = StackNavigator({
  Home: { screen: VerseScreen },
});

// const Verse = StackNavigator({
//   Home: { screen: TabBar },
// });

export default Verse
