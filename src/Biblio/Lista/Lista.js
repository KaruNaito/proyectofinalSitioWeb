import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Lista = () => {
  const [productos, setProductos] = useState([]);
  const [user] = useAuthState(auth);

  const productsCollection = collection(db, 'productos');

  const getProducts = useCallback(async () => {
    const data = await getDocs(productsCollection);
    setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [productsCollection]);

  const deleteProduct = async (id) => {
    const productDoc = doc(db, 'productos', id);
    await deleteDoc(productDoc);
    getProducts();
  };

  const confirmDelete = (id, autor) => {
    if (user && user.uid === autor) {
      MySwal.fire({
        title: '¿Eliminar la historia?',
        text: 'No se podrá revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo!',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProduct(id);
          Swal.fire('Eliminado!', 'La historia ha sido eliminada.', 'success');
        }
      });
    } else {
      alert('No tienes permiso para eliminar esta historia.');
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
          </div>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((product) => (
                <tr key={product.id}>
                  <td>{product.titulo}</td>
                  <td>{product.autor}</td>
                  <td>
                    <Link to={`/edit/${product.id}`} className='btn btn-light'>Edit</Link>
                    <Link to={`/Biblioteca/Historia/${product.id}`} className='btn btn-light'>
                      Leer
                    </Link>
                    <button
                      onClick={() => confirmDelete(product.id, product.autor)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Lista;
