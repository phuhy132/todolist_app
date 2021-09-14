import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Color from "./Color";
import TempData from "./TempData";
import Todolist from "./Components/Todolist";
import AddModal from "./Components/AddModal";
import fire from "./firebase";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user:{},
    loading:true
    
  };
  componentDidMount(){
    firebase=new fire((error,user)=>{
      if(error){
        return alert("something wrong")

      }
      firebase.getLists(lists=>{
        this.setState({lists,user},()=>{
          this.setState({loading:false})
        })
      })
      this.setState({user})
    })
    

  }
  componentWillUnmount(){
    firebase.detach();
  }
  toggleAddTodomodal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  renderList = (list) => {
    return <Todolist list={list} updateList={this.updateList} />;
  };
  addList = (list) => {
    this.setState({
      list: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
  };
  updateList = (list) => {
    this.setState({
      list:this.state.lists.map(item=>{
      return item.id === list.id?list:item;
      })
    })
  };
  render() {
    if(this.state.loading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size='large' color={Color.blue}/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodomodal()}
        >
          <AddModal
            closeModal={() => this.toggleAddTodomodal()}
            addList={this.addList}
          />
        </Modal>
        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo{" "}
            <Text style={{ fontWeight: "300", color: Color.blue }}>List</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodomodal()}
          >
            <AntDesign name="plus" size={16} color={Color.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add Lists</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: Color.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: Color.black,
    paddingHorizontal: 44,
  },
  addList: {
    borderWidth: 2,
    borderColor: Color.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: Color.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
