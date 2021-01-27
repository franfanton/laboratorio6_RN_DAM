import React, {useContext, useState} from 'react';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {StoreContext} from '../context/storeContext';
import {ColorPicker} from 'react-native-color-picker';
import useOrientation, {SCREEN} from '../hooks/useOrientation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheetModal from './bottomSheetModal';

export const ListaClientes = () => {
  const {clientes, setClientes} = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [primaraPantalla, setPrimeraPantalla] = useState(true);
  const [nombreNuevoCliente, setNombreNuevoCliente] = useState('');
  const [colorNuevoCliente, setColorNuevoCliente] = useState('red');
  const screenDirection = useOrientation();

  const crearCliente = () => {
    setClientes([
      ...clientes,
      {
        nombre: nombreNuevoCliente,
        color: colorNuevoCliente,
        id: Math.random(),
      },
    ]);
    setNombreNuevoCliente('');
    setColorNuevoCliente('red');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Listado de Clientes</Text>
      <BottomSheetModal
        visible={modalVisible}
        onClosePressed={() => setModalVisible(false)}
        title={primaraPantalla ? 'Crear nuevo cliente' : 'Elegir Color'}>
        <>
          {primaraPantalla && (
            <PrimeraPantalla
              nombreNuevoCliente={nombreNuevoCliente}
              setNombreNuevoCliente={setNombreNuevoCliente}
              colorNuevoCliente={colorNuevoCliente}
              setPrimeraPantalla={setPrimeraPantalla}
              crearCliente={crearCliente}
            />
          )}
          {!primaraPantalla && (
            <SegundaPantalla
              setPrimeraPantalla={setPrimeraPantalla}
              setColorNuevoCliente={setColorNuevoCliente}
            />
          )}
        </>
      </BottomSheetModal>
      <Button
        style={styles.button}
        accessoryLeft={PlusIcon}
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={clientes}
        key={screenDirection}
        numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
        renderItem={({item}) => {
          return (
            <Card
              style={{...styles.card, backgroundColor: item.color}}
              key={item.id}>
              <Text style={styles.cardText}>{item.nombre}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

const PrimeraPantalla = ({
  nombreNuevoCliente,
  setNombreNuevoCliente,
  colorNuevoCliente,
  setPrimeraPantalla,
  crearCliente,
}) => {
  return (
    <>
      <TextInput
        placeholder="Nombre de Cliente"
        style={styles.textInput}
        value={nombreNuevoCliente}
        onChangeText={(nuevoTexto) => {
          setNombreNuevoCliente(nuevoTexto);
        }}
      />
      <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
        <TextInput
          placeholder="Color de Cliente"
          editable={false}
          style={styles.textInput}
          value={colorNuevoCliente}
        />
      </TouchableOpacity>
      <Button style={styles.modalButton} onPress={() => crearCliente()}>
        Crear Cliente
      </Button>
    </>
  );
};

const SegundaPantalla = ({setColorNuevoCliente, setPrimeraPantalla}) => {
  return (
    <>
      <ColorPicker
        onColorSelected={(color) => {
          setPrimeraPantalla(true);
          setColorNuevoCliente(color);
        }}
        hideSliders={true}
        style={styles.container}
      />
      <Button
        style={styles.modalButton}
        onPress={() => setPrimeraPantalla(true)}>
        Volver
      </Button>
    </>
  );
};

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;

const styles = StyleSheet.create({
  container: {flex: 1},
  card: {flex: 1, margin: 5},
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  modalView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '50%',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  modalButton: {
    marginVertical: 10,
  },
  cardText: {textAlign: 'center', fontWeight: 'bold'},
  titulo: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  }
});