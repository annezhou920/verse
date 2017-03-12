import poems from './poems.js'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Picker,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import GestureRecognizer from 'react-native-swipe-gestures'
import LinearGradient from 'react-native-linear-gradient'

const window = Dimensions.get('window');
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
      animating: false
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
        image: poems[randomPoemNum].image,
        title: poems[randomPoemNum].title,
        poet: poems[randomPoemNum].poet,
        language: poems[randomPoemNum].language,
        lines: poems[randomPoemNum].lines
      }
    })
  }

  translateText(key, newLang){
    this.setState({
      selectedLang: newLang,
      animating: true
    })

    let currentPoem = this.state.poem
    let image = currentPoem.image
    let lines = currentPoem.lines
    let poet = currentPoem.poet
    let title = currentPoem.title

    let baseUrl = googleBaseUrl + apiKey
    let currentLang = "source=" + currentPoem.language + "&"
    let targetLang = "target=" + newLang + "&q="
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
            animating: false,
            poem: {
              language: newLang,
              title: translatedText.pop(),
              poet: poet,
              lines: translatedText,
              image: image
            }
          })

        })
        .done();

  }

  render(){
    if ( this.state.animating === true ) {
      return this.renderLoading();
    }
    return this.renderPoem();
  }

  renderLoading(){
    return (
      <View style={styles.container}>
        <View style={styles.poemContainer}>
          <ActivityIndicator
             animating={this.state.animating}
             style={styles.activity}
             size="large"
             color="white"
           />
        </View>
      </View>
    )
  }

  renderPoem(){
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
              config={config}>

              <ScrollView>
                <Image
                source={{uri: this.state.poem.image}}
                style={styles.image}
                >
                </Image>

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



            <TouchableHighlight
              style={styles.buttonContainer}
              underlayColor='#407dc5'
              onPress={this.fetchPoem}>
              <Text style={styles.buttonText}>🔀</Text>
            </TouchableHighlight>



    </View>


    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    height: 30,
  },
  mask: {
    height: 35,
    overflow: 'hidden',
    justifyContent: 'space-around',
    backgroundColor: '#eef5fb',
  },
  poemContainer: {
    flex: 1,
    backgroundColor: '#8db8e2',
  },
  image: {
    width: window.width,
    height: 100
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 5,
    marginLeft: 50,
    marginTop: 40,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: "Futura",
    paddingRight: 50,
  },
  author: {
    fontSize: 17,
    marginLeft: 50,
    textAlign: 'left',
    color: 'white',
    paddingBottom: 10,
    fontFamily: "Futura",
    paddingRight: 50,
  },
  text: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 50,
    marginLeft: 50,
    color: 'white',
    fontSize: 16,
    fontFamily: "Futura",
    paddingRight: 50,
  },
  buttonContainer: {
    height: 40,
    backgroundColor: '#407dc5',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: "Futura"
  },
  activity: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 100
  }
});

const Verse = StackNavigator({
  Home: { screen: VerseScreen },
});

export default Verse
