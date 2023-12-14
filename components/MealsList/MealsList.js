import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem';

function MealsList({ items }) {
  function renderMealItem(dataItem) {
    const item = dataItem.item;
    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      duration: item.duration,
      complexity: item.complexity,
      id: item.id,
    };
    return (
      <MealItem
        title={dataItem.item.title}
        imageUrl={dataItem.item.imageUrl}
        affordability={mealItemProps.affordability}
        duration={mealItemProps.duration}
        complexity={mealItemProps.complexity}
        id={mealItemProps.id}
      ></MealItem>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(dataItem) => dataItem.id}
        renderItem={(dataItem) => renderMealItem(dataItem)}
      />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
