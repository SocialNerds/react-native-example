import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';
import EditableItem from './EditableItem';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      text: ''
    };
    this.loadData();
  }

  loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('@MyStore:taks');
      if (data !== null) {
        this.setState({data: JSON.parse(data)});
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@MyStore:taks', JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  }

  createItem = () => {
    const data = [...this.state.data, {key: this.state.text, editable: false, completed: false}];
    this.setState({data, text: ''});
    this.storeData(data);
  }

  editItem = (item, state) => {
    const data = this.state.data.map(i => {
      return i.key !== item ? i : {...i, editable: state};
    });
    this.setState({data})
    this.storeData(data);
  }

  saveItem = (item, text) => {
    const data = this.state.data.map(i => {
      return i.key !== item ? i : {...i, key: text, editable: false};
    });
    this.setState({data}); 
    this.storeData(data);
  }

  deleteItem = (item) => {
    const data = this.state.data.filter(i => i.key != item);
    this.setState({data});
    this.storeData(data);
  }

  toggleItem = (item) => {
    const data = this.state.data.map(i => {
      return i.key !== item ? i : {key: i.key, editable: i.editable, completed: !i.completed};
    });
    this.setState({data});
    this.storeData(data);
  }

  clearCompleted = () => {
    const data = this.state.data.filter(i => !i.completed);
    this.setState({data});
    this.storeData(data);
  }

  viewableItem = (item) => {
    return (
      <View  style={styles.inlineItem}>
        <CheckBox
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          size={25}
          checked={item.completed}
          onPress={(checked) => this.toggleItem(item.key, checked)}
          containerStyle={styles.checkBox}
        />
        <Text style={styles.item}>{item.key}</Text>
        <Button onPress={()=>{this.editItem(item.key, true)}} title="Edit"/>
        <Button onPress={()=>{this.deleteItem(item.key)}} title="Delete"/>
      </View>
    );
  }

  renderItem = (item) => {
    return !item.editable ? this.viewableItem(item) : <EditableItem saveItem={this.saveItem} editItem={this.editItem} name={item.key}/>;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        <Button onPress={this.createItem} title="Save task" />
        <FlatList
          style={{marginBottom: 200}}
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
        />
        <Button onPress={this.clearCompleted} title="Clear completed" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 56
  },
  item: {
    paddingTop: 8,
    fontSize: 18,
    height: 44,
  },
  checkBox: {
    backgroundColor: 'white',
    borderColor: 'white',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 0,
    borderWidth: 0,
    padding: 0,
    borderRadius: 0,
  },
  inlineItem: {display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row'}
});
