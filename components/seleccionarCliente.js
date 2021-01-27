import {CheckBox, Divider, List, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  chip: {width: 30, height: 10, borderRadius: 10},
  list: {backgroundColor: 'transparent', marginTop: 10},
  item: {paddingVertical: 20},
});

const SeleccionarCliente = ({producto}) => {
  const {
    obtenerClientesDelProducto,
    clientes,
    agregarProductoACliente,
    quitarProductoDeCliente,
  } = useContext(StoreContext);
  const clientesDelProducto = obtenerClientesDelProducto(producto);

  const renderItem = ({item, index}) => {
    const cliente = item;

    const renderColor = (color) => {
      return (
        <View
          style={[
            styles.chip,
            {
              backgroundColor: color,
            },
          ]}
        />
      );
    };

    const clienteAsignada = clientesDelProducto
      .map((c) => c.id)
      .includes(cliente.id);

    return (
      <View style={styles.item}>
        <CheckBox
          status="primary"
          checked={clienteAsignada}
          onChange={() => {
            if (!clienteAsignada) {
              agregarProductoACliente(cliente, producto);
            } else {
              quitarProductoDeCliente(cliente, producto);
            }
          }}>
          <Text category="s1">
            {cliente.nombre}
            {'    '}
            {renderColor(cliente.color)}
          </Text>
        </CheckBox>
      </View>
    );
  };

  return (
    <List
      style={styles.list}
      data={clientes}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default SeleccionarCliente;
