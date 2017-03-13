import React, {Component} from 'react';
import poems from './poems'
import Photo from './Photo'
import {
  View,
  ListView,
  StyleSheet,
  Text,
  Image,
  ScrollView
} from 'react-native';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Biography'
  }
    constructor(props) {
      super(props);
    }
    render() {
      const {state} = this.props.navigation;

      return (
        <View style={styles.container}>
          <Photo style={styles.image} source={{uri: state.params.poem.image}} />
          <View style={styles.poemContainer}>
            <ScrollView>
              <Text style={styles.title}>{state.params.poem.poet}</Text>
              <Text style={styles.text}>{state.params.poem.bio}</Text>
            </ScrollView>
          </View>
        </View>
      );
    }
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8db8e2',
    },
    poemContainer: {
      flex: 3,
      backgroundColor: '#8db8e2',
    },
    title: {
      fontSize: 20,
      textAlign: 'left',
      margin: 5,
      marginLeft: 50,
      marginTop: 20,
      color: 'white',
      fontWeight: 'bold',
      fontFamily: "Futura",
      paddingRight: 50,
    },
    text: {
      textAlign: 'left',
      marginBottom: 50,
      marginLeft: 50,
      marginTop: 20,
      color: 'white',
      fontSize: 16,
      fontFamily: "Futura",
      paddingRight: 50,
    },
    image: {
      width: window.width,
      height: 150,
      resizeMode: 'cover',
      alignItems: 'center',
    },
  });
