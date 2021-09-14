import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Color from "../Color";
import ModalList from "./Modal";

export default class Todolist extends React.Component {
  state = {
    showListVisible: false,
  };
  toggleListModal() {
    this.setState({
      showListVisible: !this.state.showListVisible,
    });
  }
  render() {
    const list = this.props.list;
    const CompletedCount = list.todos.filter((todo) => todo.completed).length;
    const RemainingCount = list.todos.length - CompletedCount;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <ModalList
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          onPress={() => this.toggleListModal()}
          style={[styles.listContainer, { backgroundColor: list.color }]}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{RemainingCount}</Text>
            <Text style={styles.subtitile}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{CompletedCount}</Text>
            <Text style={styles.subtitile}>Completed</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Color.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 40,
    fontWeight: "200",
    color: Color.white,
  },
  subtitile: {
    fontSize: 12,
    fontWeight: "700",
    color: Color.white,
  },
});
