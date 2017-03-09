/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Verse from './app/Verse'

AppRegistry.registerComponent('Verse', () => Verse);

// import React, { Component } from 'react';
// import { StackNavigator } from 'react-navigation';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import poems from './app/poems.js'
//
// class HomeScreen extends Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     return(
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           {poems[0].title}
//           {'\n'}
//           {poems[0].poet}
//         </Text>
//         <Text style={styles.instructions}>
//         </Text>
//       </View>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'left',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'left',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// const Verse = StackNavigator({
//   Home: { screen: HomeScreen },
// });
//
// AppRegistry.registerComponent('Verse', () => Verse);
