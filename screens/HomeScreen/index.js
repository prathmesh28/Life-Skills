import React from "react";
import { StyleSheet,Dimensions, AsyncStorage, StatusBar } from "react-native";
import Home from "./components/index"
import RNUrlPreview from 'react-native-url-preview';
import { Block, Checkbox, theme } from "galio-framework";
import { Button, Input } from '../../components';
import { Images, argonTheme } from "../../constants";
import { Searchbar } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          searchQuery: '',
        };
      }

      componentDidMount () {
        AsyncStorage.getItem('name', (err, name) => {
          AsyncStorage.removeItem('name')
    //dont remove this
            });
      }
        
       _onChangeSearch = query => this.setState({ searchQuery: query });

  render() {
    const { searchQuery } = this.state;
    
    return (
      <Block flex >
        <StatusBar hidden />
        <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={this._onChangeSearch}
        value={searchQuery}
      />
        <Block middle>
        
          <Block style={styles.cards}>
          <Home />
          </Block>
        </Block>
    </Block>
  )}
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  search: {
    marginTop:width*0.1,
    marginBottom:width*0.1,
    borderRadius: 50,
  },
  cards: {
    width:width*0.9
  }
});
