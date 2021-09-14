import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Color from "../Color";
import TempData from "../TempData";

export default class AddModal extends Component {
  backgroundColor = [
    "#47FA03",
    "#FAF703",
    "#FA0383",
    "#FF6C87",
    "#FF0000",
    "#00FFFB",
    "#A335FF",
    "#3749FF",
  ];
  state = {
    name: "",
    color: this.backgroundColor[0],
  };
  createList = () => {
    const { name, color } = this.state;
    const list = { name, color };
    this.props.addList(list);
    this.setState({ name: "" });
    this.props.closeModal();
  };
  renderColor() {
    return this.backgroundColor.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelected, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          onPress={this.props.closeModal}
          style={{ position: "absolute", top: 64, right: 32 }}
        >
          <AntDesign name="close" size={24} color={Color.black} />
        </TouchableOpacity>
        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create a List</Text>
          <TextInput
            style={styles.input}
            placeholder="List Name?"
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "space-between",
            }}
          >
            {this.renderColor()}
          </View>
          <TouchableOpacity
            onPress={this.createList}
            style={[styles.create, { backgroundColor: this.state.color }]}
          >
            <Text style={{ color: Color.white, fontWeight: "600" }}>
              Create!
            </Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Color.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Color.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  colorSelected: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
