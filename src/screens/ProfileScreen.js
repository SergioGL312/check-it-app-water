import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { GlobalContext } from '../wrappers/GlobalState';
import user from '../../assets/user.png';

const ProfileScreen = () => {
  const { state, setState } = useContext(GlobalContext);
  const { firstName, lastName, ip, sec } = state;
  const [gender, setGender] = useState('Femenino');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <View style={styles.profileImageContainer}>
        <Image source={user} style={styles.profileImage} />
      </View>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setState({ ...state, firstName: text })}
        placeholder="First Name"
      />
      <Text style={styles.label}>Apellidos</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setState({ ...state, lastName: text })}
        placeholder="Last Name"
      />
      <Text style={styles.label}>Ip</Text>
      <TextInput
        style={styles.input}
        value={ip}
        onChangeText={(text) => setState({ ...state, ip: text })}
        placeholder="Email Address"
        keyboardType="email-address"
      />
      <View style={styles.genderContainer}>
        <Text style={styles.label}>Género</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity onPress={() => setGender('Masculino')} style={styles.genderOption}>
            <Text style={gender === 'Masculino' ? styles.genderTextSelected : styles.genderText}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Femenino')} style={styles.genderOption}>
            <Text style={gender === 'Femenino' ? styles.genderTextSelected : styles.genderText}>Femenino</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Other')} style={styles.genderOption}>
            <Text style={gender === 'Other' ? styles.genderTextSelected : styles.genderText}>Otro</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.updateButton} onLongPress={() => setModalVisible(true)}>
        <Text style={styles.updateButtonText}>Actualizar</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Ingrese Segundos</Text>
            <TextInput
              style={styles.modalInput}
              value={sec}
              onChangeText={(text) => setState({ ...state, sec: text})}
              placeholder="Segundos"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    paddingTop: 20
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 23,
    backgroundColor: '#f5f5f5',
  },
  genderContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    width: '100%',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    width: '80%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 28
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
