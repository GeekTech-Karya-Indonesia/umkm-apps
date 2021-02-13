import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5
  },
  textIcon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textIconSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9932CC'
  },
  container: {
    flex: 1,
    borderColor: '#cccccc',
    backgroundColor: 'transparent',
  },
  containerSearchBar: {
    paddingTop: 30,
  },
  containerItem: {
    padding: 10,
    backgroundColor: 'transparent',
  }
});

export default styles;
