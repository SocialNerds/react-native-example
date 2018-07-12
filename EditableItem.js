import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class EditableItem extends Component {
  constructor(props) {
    console.log(props, 'contructor')
    super(props);
    this.state = {
      name: props.name,
      text: props.name
    }
  }

  render() {
    console.log(this.state, 'state')
    const {name} = this.state;
    return (
      <View  style={styles.inlineItem}>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 100}}
        onChangeText={(text) => this.setState({text})}
        value={name}
        />
        <Button onPress={()=>{this.props.saveItem(name, this.state.text)}} title="Save"/>
        <Button onPress={()=>{this.props.editItem(name, false)}} title="Cancel"/>
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

export default EditableItem;