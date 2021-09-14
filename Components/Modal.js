import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Color from "../Color";

export default class Modal extends Component {
  state = {
    newList: "",
  };
  toggleCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };
  addTodo=()=>{
    let list=this.props.list
    list.todos.push({title:this.state.newList, completed:false})
    this.props.updateList
    this.setState({newList:""})
  }
  renderList = (list, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleCompleted(index)}>
          <Ionicons
            name={list.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={Color.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: list.completed ? "line-through" : "none",
              color: list.completed,
            },
          ]}
        >
          {list.title}
        </Text>
      </View>
    );
  };
  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const CompletedCount = list.todos.filter((task) => task.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={this.props.closeModal}
            style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          >
            <AntDesign name="close" size={24} color={Color.black} />
          </TouchableOpacity>
          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {CompletedCount} of {taskCount} task finished
              </Text>
            </View>
          </View>
          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderList(item, index)}
              keyExtractor={_, index => index.totring()}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { color: list.color }]}
              onChangeText={(text) => this.setState({ newList: text })}
              value={this.state.newList}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={()=> this.addTodo()}
            >
              <AntDesign name="plus" size={16} color={Color.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Color.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: Color.gray,
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: Color.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
