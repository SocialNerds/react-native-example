import React from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import EditableItem from './EditableItem';

export default class App extends React.Component {
  state = {
    data: [
    ],
    text: ''
  }

  createItem = () => {
    this.setState({data: [...this.state.data, {key: this.state.text, editable: false}], text: ''})
  }

  editItem = (item, state) => {
    const data = this.state.data.map(i => {
      return i.key !== item ? i : {key: i.key, editable: state};
    });
    this.setState({data})
  }

  saveItem = (item, text) => {
    const data = this.state.data.map(i => {
      return i.key !== item ? i : {key: text, editable: false};
    });
    this.setState({data})
  }

  deleteItem = (item) => {
    const data = this.state.data.filter(i => i.key != item);
    this.setState({data});
  }

  viewableItem = (item) => {
    return (
      <View  style={styles.inlineItem}>
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
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
        />
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
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  inlineItem: {display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row'}
});
