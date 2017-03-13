import React, {Component} from 'react';
import poems from './poems'
import Row from './Row'
import {
  View,
  ListView,
  StyleSheet,
  Text,
  ScrollView,
  List,
  ListItem
} from 'react-native';

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

const sortedPoems = poems.sort(function(a, b) {
  var nameA = a.poet.toUpperCase(); // ignore upper and lowercase
  var nameB = b.poet.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
});

export default class ListViewScreen extends Component {
    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      this.state = {
        dataSource: ds.cloneWithRows(sortedPoems)
      };
    }
    render() {
      return (
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(poems) => <Row {...poems} />}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />
        </View>
      );
    }
  }
