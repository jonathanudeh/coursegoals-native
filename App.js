import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHndler() {
    setIsModalVisible(true);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((prev) => [
      ...prev,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);

    setIsModalVisible(false);
  }

  function deleteGoalHandler(id) {
    setCourseGoals((prev) => courseGoals.filter((goal) => goal.id !== id));
  }

  return (
    <>
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#af82e9"
          onPress={startAddGoalHndler}
        />

        <GoalInput
          onAddGoal={addGoalHandler}
          visible={isModalVisible}
          onCancelModal={() => setIsModalVisible(false)}
        />

        <View style={styles.goalContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalContainer: {
    flex: 8,
  },
});
