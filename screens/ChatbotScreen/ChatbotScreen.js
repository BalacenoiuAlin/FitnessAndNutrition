import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { queryChatbot, searchRecipes } from '../../services/apiFoodServices';

const ChatbotScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const handleQuerySubmit = async () => {
    Keyboard.dismiss();
    setResponse(null);
    setRecipes([]);
    try {
      const result = await queryChatbot(query);
      setResponse(result);
    } catch (error) {
      console.error('Error querying the chatbot:', error);
      setResponse({ error: 'Error querying the chatbot' });
    } finally {
      setQuery('');
    }
  };

  const handleRecipeSearch = async () => {
    setResponse(null);
    setRecipes([]);
    try {
      const recipeResults = await searchRecipes(query);
      if (recipeResults.length > 0) {
        setRecipes(recipeResults);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setQuery('');
    }
  };

  const renderResponse = () => {
    if (!response) {
      return null;
    }

    if (response.error) {
      return <Text style={styles.errorText}>{response.error}</Text>;
    }

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Response for your question :</Text><Text style={styles.label}> {response.text}</Text>
        <Text>Calories: {response.food.calories}</Text>
        {response.food.nutrients && Object.keys(response.food.nutrients).map((key) => (
          <Text key={key}>{key}: {response.food.nutrients[key].quantity} {response.food.nutrients[key].unit}</Text>
        ))}
        {response.food.dietLabels && <Text>Diet Labels: {response.food.dietLabels.join(', ')}</Text>}
        {response.food.healthLabels && <Text>Health Labels: {response.food.healthLabels.join(', ')}</Text>}
      </View>
    );
  };

  const renderRecipes = () => {
    if (recipes.length === 0) {
      return null;
    }

    return (
      <View>
        {recipes.map((recipe, index) => (
          <View key={index} style={styles.recipeContainer}>
            <Text style={styles.recipeLabel}>{recipe.label}</Text>
            {recipe.image && <Image source={{ uri: recipe.image }} style={styles.recipeImage} />}
            <Text style={styles.boldText}>Source: </Text><Text>{recipe.source}</Text>
            <Text style={styles.boldText}>URL:  </Text><Text>{recipe.url}</Text>
            <Text style={styles.boldText}>Calories:  </Text><Text>{recipe.calories}</Text>
            <Text style={styles.boldText}>Ingredients:  </Text><Text>{recipe.ingredientLines.join(', ')}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>Please use a well defined sentence, for a nutritional question use submit and make it a question. In case of searching recipes, type the recipe that you want to search.</Text>
        <Text style={styles.warningText}>For the chatbot to respond, use keywords like 'foodname', 'nutrition','label','ingredients' or words that are included in them.</Text>
      </View>
      <ScrollView style={styles.responseContainer}>
        {renderResponse()}
        {renderRecipes()}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Enter food item"
        />
        <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button} onPress={handleQuerySubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRecipeSearch}>
          <Text style={styles.buttonText}>Search Recipes</Text>
        </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  warningContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#203C3B',
    color: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  warningText: {
    color: '#203C3B',
    fontSize: 14,
    justifyContent: 'flex-start',
    marginVertical: 2,
  },
  infoContainer:{
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 0.1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  responseContainer: {
    flex: 1,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  boldText:{
    fontWeight: 'bold',
    color: '#203C3B',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '111%',
    left: -20,
    justifyContent: 'space-between',
    backgroundColor: '#203C3B',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    left: -60,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    color: '#203C3B',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#203C3B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 0.1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#203C3B',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
  recipeContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 0.1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  recipeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  }
});

export default ChatbotScreen;
