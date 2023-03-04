import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks((state) => [
      ...tasks,
      { id: new Date().getTime(), done: false, title: newTaskTitle },
    ]);
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
    setTasks((state) => state.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
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
