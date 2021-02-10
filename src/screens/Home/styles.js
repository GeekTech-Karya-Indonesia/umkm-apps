import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  textIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 5,
    marginBottom: 5
  },
  textHeader: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 0,
    color: '#9932CC'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
}
});

export default styles;
