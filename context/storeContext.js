import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const API_URL = 'https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    {nombre: 'Categoria 1', color: 'red', id: Math.random().toString(10)},
    {nombre: 'Categoria 2', color: 'blue', id: Math.random().toString(10)},
    {nombre: 'Categoria 3', color: 'green', id: Math.random().toString(10)},
    {nombre: 'Categoria 4', color: 'yellow', id: Math.random().toString(10)},
  ]);
  const [clientes, setClientes] = useState([
    {nombre: 'Cliente 1', color: 'red', id: Math.random().toString(10)},
    {nombre: 'Cliente 2', color: 'blue', id: Math.random().toString(10)},
    {nombre: 'Cliente 3', color: 'green', id: Math.random().toString(10)},
    {nombre: 'Cliente 4', color: 'yellow', id: Math.random().toString(10)},
  ]);
  const [categoriasProductos, setCategoriasProductos] = useState({});
  const [clientesProductos, setClientesProductos] = useState({});
  
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarProductoACategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }

    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (!categoriaProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCategoriasProductos = {
        ...categoriasProductos,
        [categoria.id]: [...categoriaProductos, producto.id],
      };
      setCategoriasProductos(newCategoriasProductos);
    }
  };

  const agregarProductoACliente = (cliente, producto) => {
    if (!cliente?.id || !producto?.id) {
      return; // No hay id de cliente o producto
    }

    const clienteProductos = clientesProductos[cliente.id] ?? [];
    if (!clienteProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newClientesProductos = {
        ...clientesProductos,
        [cliente.id]: [...clienteProductos, producto.id],
      };
      setClientesProductos(newClientesProductos);
    }
  };

  const quitarProductoDeCategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (categoriaProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setCategoriasProductos({
        ...categoriasProductos,
        [categoria.id]: categoriaProductos.filter((pid) => pid !== producto.id),
      });
    }
  };

  const quitarProductoDeCliente = (cliente, producto) => {
    if (!cliente?.id || !producto?.id) {
      return; // No hay id de cliente o producto
    }
    const clienteProductos = clientesProductos[cliente.id] ?? [];
    if (clienteProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setClientesProductos({
        ...clientesProductos,
        [cliente.id]: clienteProductos.filter((pid) => pid !== producto.id),
      });
    }
  };

  const obtenerCategoriasDelProducto = (producto) => {
    const categoriasId = Object.keys(categoriasProductos);
    const categoriasIdDelProducto = categoriasId.reduce(
      (acc, cur) =>
        categoriasProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = categorias.filter((c) =>
      categoriasIdDelProducto.includes(c.id),
    );
    return results;
  };

  const obtenerClientesDelProducto = (producto) => {
    const clientesId = Object.keys(clientesProductos);
    const clientesIdDelProducto = clientesId.reduce(
      (acc, cur) =>
        clientesProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = clientes.filter((c) =>
      clientesIdDelProducto.includes(c.id),
    );
    return results;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        productos,
        setProductos,
        categorias,
        clientes,
        setCategorias,
        setClientes,
        agregarProductoACategoria,
        agregarProductoACliente,
        quitarProductoDeCategoria,
        quitarProductoDeCliente,
        obtenerCategoriasDelProducto,
        obtenerClientesDelProducto,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
