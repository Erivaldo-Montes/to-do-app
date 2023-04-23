import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!!tasks.find((task) => task.title === newTaskTitle)) {
      return Alert.alert("Você não pode cadastrar uma task com o mesmo nome");
    }
    setTasks((state) => [
      ...tasks,
      { id: new Date().getTime(), done: false, title: newTaskTitle },
    ]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks((state) =>
      state.map((task) => {
        if (task.id === taskId) {
          if (task.done) {
            task.title = taskNewTitle;
          }
        }
        return task;
      })
    );
  }

  function handleToggleTaskDone(id: number) {
    setTasks((state) =>
      state.map((task) => {
        if (task.id === id) {
          if (task.done) {
            task.done = false;
          } else {
            task.done = true;
          }
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "sim",
          onPress: () => {
            setTasks((state) => state.filter((task) => task.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        editTask={handleEditTask}
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
