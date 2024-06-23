import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { queryChatbot } from '../../services/apiFoodServices';

const ChatbotScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);

  const handleQuerySubmit = async () => {
    Keyboard.dismiss();
    try {
      const result = await queryChatbot(query);
      setResponse(result);
    } catch (error) {
      console.error('Error querying the chatbot:', error);
      setResponse({ error: 'Error querying the chatbot' });
    }
  };

  const renderResponse = () => {
    if (!response) {
      return null;
    }

    if (response.error) {
      return <Text style={styles.errorText}>{response.error}</Text>;
    }

    return response.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.label}>{item.food.label} => calories: {item.food.nutrients.ENERC_KCAL}</Text>
        {item.food.nutrients && (
          <>
            <Text>Calories: {item.food.nutrients.ENERC_KCAL}</Text>
            <Text>Protein: {item.food.nutrients.PROCNT}g</Text>
            <Text>Fat: {item.food.nutrients.FAT}g</Text>
            <Text>Carbohydrates: {item.food.nutrients.CHOCDF}g</Text>
            <Text>Fiber: {item.food.nutrients.FIBTG}g</Text>
          </>
        )}
        {item.food.ingredients && <Text>Ingredients: {item.food.ingredients}</Text>}
        {item.food.image && <Image source={{ uri: item.food.image }} style={styles.image} />}
      </View>
    ));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView style={styles.responseContainer}>
        {renderResponse()}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Ask me something about food or nutrition"
        />
        <TouchableOpacity style={styles.button} onPress={handleQuerySubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  responseContainer: {
    flex: 1,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '111%',
    justifyContent: 'space-between',
    backgroundColor: '#203C3B',
    left: -20,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 13,
    bottom: -10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#203C3B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default ChatbotScreen;
