import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { queryChatbot } from '../../services/apiFoodServices';

const ChatbotScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [detailedResponse, setDetailedResponse] = useState(null);

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

  const handleItemPress = async (item) => {
    try {
      const result = await queryChatbot(item.text);
      setDetailedResponse(result);
    } catch (error) {
      console.error('Error fetching detailed food data:', error);
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
      <View>
        <TouchableOpacity onPress={() => handleItemPress(response)}>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Nutritional Information</Text>
            <Text>Calories: {response.food.calories}</Text>
            {response.food.nutrients && Object.keys(response.food.nutrients).map((key) => (
              <Text key={key}>{key}: {response.food.nutrients[key].quantity} {response.food.nutrients[key].unit}</Text>
            ))}
            {response.food.dietLabels && <Text>Diet Labels: {response.food.dietLabels.join(', ')}</Text>}
            {response.food.healthLabels && <Text>Health Labels: {response.food.healthLabels.join(', ')}</Text>}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDetailedResponse = () => {
    if (!detailedResponse) {
      return null;
    }

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.label}>{detailedResponse.food.label}</Text>
        {detailedResponse.food.nutrients && Object.keys(detailedResponse.food.nutrients).map((key) => (
          <Text key={key}>{key}: {detailedResponse.food.nutrients[key].quantity} {detailedResponse.food.nutrients[key].unit}</Text>
        ))}
        {detailedResponse.food.ingredients && <Text>Ingredients: {detailedResponse.food.ingredients}</Text>}
        {detailedResponse.food.image && <Image source={{ uri: detailedResponse.food.image }} style={styles.image} />}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView style={styles.responseContainer}>
        {renderResponse()}
        {renderDetailedResponse()}
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
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#203C3B',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#203C3B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginTop: 20,
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
