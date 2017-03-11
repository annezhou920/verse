import poems from './poems.js'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Picker,
  TextInput,
  Dimensions
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import GestureRecognizer from 'react-native-swipe-gestures'

const window = Dimensions.get('window')
const Item = Picker.Item;
const googleBaseUrl =
  "https://translation.googleapis.com/language/translate/v2?"
const apiKey = "key=AIzaSyA7MUv6j75JssJAITGWYsN2vZh6AVLRtVI&"

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

class VerseScreen extends Component {
  static navigationOptions = {
    title: 'Verse'
  }
  constructor(){
    super()
    this.state = {
      selectedLang: poems[0].language,
      poem: poems[0],
      textInputValue: "",
      gestureName: 'none',
    }
    this.fetchPoem = this.fetchPoem.bind(this)
    this.translateText = this.translateText.bind(this)
  }

  onSwipeLeft(gestureState) {
    this.fetchPoem()
  }

  onSwipeRight(gestureState) {
    this.fetchPoem()
  }

  componentDidMount(){
    this.fetchPoem()
  }

  fetchPoem(){
    let min = 0
    let max = poems.length - 1
    let randomPoemNum = Math.floor(Math.random() * (max - min + 1)) + min;
    this.setState({
      selectedLang: poems[randomPoemNum].language,
      poem: {
        title: poems[randomPoemNum].title,
        poet: poems[randomPoemNum].poet,
        language: poems[randomPoemNum].language,
        lines: poems[randomPoemNum].lines
      }
    })
  }

  translateText(key, newLang){
    this.setState({ selectedLang: newLang })

    let currentPoem = this.state.poem
    let baseUrl = googleBaseUrl + apiKey
    let currentLang = "source=" + currentPoem.language + "&"
    let targetLang = "target=" + newLang + "&q="
    let lines = currentPoem.lines
    let poet = currentPoem.poet
    let title = currentPoem.title
    let queryString = lines.join("&q=") + "&q=" + title
    let fetchUrl = baseUrl + currentLang + targetLang + queryString

    fetch(fetchUrl, {method: "GET"})
        .then((res) => res.json())
        .then((resData) => {
          translatedText = []
          resData.data.translations.forEach(function(translation){
            translatedText.push(translation.translatedText)
          })
          this.setState({
            poem: {
              language: newLang,
              title: translatedText.pop(),
              poet: poet,
              lines: translatedText
            }
          })

        })
        .done();
  }

  // renderLoading(){
  //   return (
  //     <View style={styles.container}>
  //       <Text>
  //         Translating poem from {this.state.poem.language} to {this.state.selectedLang}
  //       </Text>
  //     </View>
  //   )
  // }
  //
  // renderPoem(){
  //   return (
  //
  //   )
  // }

  render() {
    return (

      <View style={styles.container}>


        <Picker style={styles.mask}
          selectedValue={this.state.selectedLang}
          onValueChange={this.translateText.bind(this, 'selectedLang')}
          mode="dropdown">
          <Item label="English" value="en" style={styles.item}/>
          <Item label="Spanish" value="es" style={styles.item}/>
          <Item label="Chinese" value="zh-CN" style={styles.item}/>
          <Item label="Icelandic" value="is" style={styles.item}/>
          <Item label="Arabic" value="ar" style={styles.item}/>
        </Picker>

        <View style={styles.poemContainer}>
          <GestureRecognizer
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
            >

            <ScrollView>
              <Text style={styles.title}>
                {this.state.poem.title}
              </Text>

              <Text style={styles.author}>
                {this.state.poem.poet}
              </Text>

              <Text style={styles.text}>
                {this.state.poem.lines.join("\n")}
              </Text>
            </ScrollView>

          </GestureRecognizer>
          </View>

           <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              underlayColor='transparent'
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
    flex: 1
  },
  pickerContainer: {
    padding: 0,
    margin: 0,
    height: 75,
    borderWidth: 1,
    borderColor: 'red'
  },
  item: {
    flex: 1,
    height: 30
  },
  mask: {
    height: 35,
    overflow: 'hidden',
    justifyContent: 'space-around'
  },
  poemContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'darkseagreen'
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 5,
    marginLeft: 50,
    color: 'white'
  },
  author: {
    fontSize: 15,
    marginLeft: 50,
    textAlign: 'left',
    color: 'white',
    paddingBottom: 10
  },
  text: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 50,
    marginLeft: 50,
    color: 'white',
    marginRight: 50,
  },
  buttonContainer: {
    height: 50,
    // marginTop: 20,
    backgroundColor: 'olive',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    // backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});

const Verse = StackNavigator({
  Home: { screen: VerseScreen },
});

// const Verse = StackNavigator({
//   Home: { screen: TabBar },
// });

export default Verse
