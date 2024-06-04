import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Picker } from 'react-native';
import { GlobalContext } from '../wrappers/GlobalState';

const ProfileScreen = () => {
  const { state, setState } = useContext(GlobalContext);
  const { firstName, lastName, ip } = state;
  const [gender, setGender] = useState('Femenino');

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
      </View>
      <Text>Nombre</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setState({ ...state, firstName: text })}
        placeholder="First Name"
      />
      <Text>Apellidos</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setState({ ...state, lastName: text })}
        placeholder="Last Name"
      />
      <Text>Red</Text>
      <TextInput
        style={styles.input}
        value={ip}
        onChangeText={(text) => setState({ ...state, ip: text })}
        placeholder="ip Address"
        keyboardType="ip-address"
      />
      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Genero</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity onPress={() => setGender('Masculino')} style={styles.genderOption}>
            <Text style={gender === 'Masculino' ? styles.genderTextSelected : styles.genderText}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Femenino')} style={styles.genderOption}>
            <Text style={gender === 'Femenino' ? styles.genderTextSelected : styles.genderText}>Femenino</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Other')} style={styles.genderOption}>
            <Text style={gender === 'Other' ? styles.genderTextSelected : styles.genderText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  genderContainer: {
    marginBottom: 20,
  },
  genderLabel: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    alignItems: 'center',
  },
  genderText: {
    color: '#000',
  },
  genderTextSelected: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;