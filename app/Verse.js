import poems from './poems'
import Loading from './Loading'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Picker,
  Image,
  Dimensions
} from 'react-native';
import {StackNavigator} from 'react-navigation'
import GestureRecognizer from 'react-native-swipe-gestures'

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
  constructor(props){
    super(props)
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
      poem: poems[randomPoemNum]
    })
  }

  translateText(key, newLang){
    this.setState({
      selectedLang: newLang,
      animating: true
    })

    let baseUrl = googleBaseUrl + apiKey
    let currentLang = "source=" + this.state.poem.language + "&"
    let targetLang = "target=" + newLang + "&q="
    let queryString = this.state.poem.lines.join("&q=") + "&q=" + this.state.poem.title
    let fetchUrl = baseUrl + currentLang + targetLang + queryString

    fetch(fetchUrl, {method: "GET"})
        .then((res) => res.json())
        .then((resData) => {
          let translatedText = []
          resData.data.translations.forEach(function(translation){
            translatedText.push(translation.translatedText)
          })
          this.setState({
            animating: false,
            poem: {
              language: newLang,
              title: translatedText.pop(),
              poet: this.state.poem.poet,
              lines: translatedText,
              image: this.state.poem.image
            }
          })

        })
        .done();

  }

  render(){
    return (
      this.state.animating ? <Loading animating={this.state.animating} /> :

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

        <Image
          source={{uri: this.state.poem.image}}
          style={styles.image}>
        </Image>

        <View style={styles.poemContainer}>
          <GestureRecognizer
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}>

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
    height: 150,
    resizeMode: 'cover',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 5,
    marginLeft: 50,
    marginTop: 30,
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
    paddingBottom: 20,
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

const Verse = StackNavigator({
  Home: { screen: VerseScreen },
});

export default Verse
