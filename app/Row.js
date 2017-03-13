import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import {StackNavigator, StackRouter} from 'react-navigation'
import poems from './poems'

// const Row = (props) => (
//   <View style={styles.container}>
//       <Image source={{ uri: props.image}} style={styles.photo} />
//
//         <Text style={styles.text}>
//           {props.poet}
//         </Text>
//
//   </View>
// );
//
// export default Row;

const sortedPoems = poems.sort(function(a, b) {
  var nameA = a.poet.toUpperCase(); // ignore upper and lowercase
  var nameB = b.poet.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0; // names must be equal
});


export default class Row extends Component {
  static navigationOptions = {
    title: 'Biography'
  }

  constructor(props) {
    super(props);
  }

  setNativeProps(nativeProps) {
   this._root.setNativeProps(nativeProps);
 }

  render() {
    // const {navigate} = this.props.navigation

    // var ids = this.props.id
    console.log(this.props)

    return (
      <View
        style={styles.container}
        ref={component => this._root = component} {...this.props}
        >
        <Image source={{ uri: this.props.image}} style={styles.photo} />
        <TouchableHighlight
          underlayColor='transparent'
          onPress={() => this.props.sendProps.navigate('Profile', {poem: sortedPoems[this.props.id]})}
          >
          <Text style={styles.text}>{this.props.poet}</Text>
        </TouchableHighlight>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    color: 'white',
    fontFamily: 'Futura'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 30
  },
});
