import React, {Component} from 'react';
import poems from './poems'
import Row from './Row'
import SearchBar from './SearchBar'
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {StackNavigator, StackRouter} from 'react-navigation'

const sortedPoems = poems.sort(function(a, b) {
  var nameA = a.poet.toUpperCase(); // ignore upper and lowercase
  var nameB = b.poet.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0; // names must be equal
});

export default class ListViewScreen extends Component {
  static navigationOptions = {
    title: 'Poets'
  }

    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      this.state = {
        dataSource: ds.cloneWithRows(sortedPoems)
      };
    }

    render() {
      const {state} = this.props.navigation;

      return (
        <View style={styles.container}>
          <ListView

            dataSource={this.state.dataSource}

            renderRow={(sortedPoems) => <Row {...sortedPoems} sendProps={this.props.navigation} />}

            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            renderHeader={() => <SearchBar />}
          />
        </View>
      );
    }
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8db8e2',
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'white',
    },
    text: {
      color: 'black'
    }
  });
