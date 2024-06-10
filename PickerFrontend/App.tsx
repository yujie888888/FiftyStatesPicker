/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native'; // 这里用到什么添什么

type State = {
  name: string;
};

const useFetchStates = (url: string) => {
  const [states, setStates] = useState<State[]>([]);
  const fetchStates = () => {
    axios.get(url)
      .then(response => {
        console.log('Data fetched:', response.data);
        setStates(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    fetchStates();
  }, [url]);

  return states;
};

const App = () => {
  const states = useFetchStates('http://192.168.1.160:3001/states');
  const [selectedState, setSelectedState] = useState<string>("state");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handlePickerChange = (itemValue: string) => {
    setSelectedState(itemValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>State picker challenge</Text>
      <TouchableOpacity style={styles.selectBox} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedText}>{selectedState}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedState}
              style={styles.picker}
              onValueChange={(itemValue) => handlePickerChange(itemValue)} >
              {states.map((state, index) => (
                <Picker.Item key={index} label={state.name} value={state.name} />
              ))}
            </Picker>
            <Button title="Done" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  label: {
    fontSize: 24,
    fontFamily: 'Arial',
    marginBottom: 16,
    textAlign: 'center'
  },
  selectBox: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  selectedText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  picker: {
    height: 250,
    width: '100%',
  },
});

export default App;
