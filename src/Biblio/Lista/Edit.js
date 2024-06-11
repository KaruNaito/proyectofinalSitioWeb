import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Edit = () => {
  const [titulo, setTitulo] = useState('');
  const [leer, setLeer] = useState('');
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const getProductById = async () => {
    const productDoc = doc(db, 'productos', id);
    const product = await getDoc(productDoc);
    if (product.exists()) {
      const data = product.data();
      if (data.autor === user?.uid) {
        setTitulo(data.titulo);
        setLeer(data.leer);
      } else {
        alert('No tienes permiso para editar esta historia.');
        navigate('/Biblioteca');
      }
    } else {
      console.log('El producto no existe');
    }
  };

  const update = async (e) => {
    e.preventDefault();
    const productDoc = doc(db, 'productos', id);
    const data = { titulo, leer };
    await updateDoc(productDoc, data);
    navigate('/Biblioteca');
  };
  const cancel = () => {
    navigate('/Biblioteca');
  };

  useEffect(() => {
    if (user) {
      getProductById();
    } else {
      alert('Debes iniciar sesión para editar una historia.');
      navigate('/signin');
    }
  }, [user]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Editar Historia</h1>
          <form onSubmit={update}>
            <div className='mb-3'>
              <label className='form-label'>Titulo</label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Redactar</label>
              <textarea
                value={leer}
                onChange={(e) => setLeer(e.target.value)}
                className='form-control'
                rows='15'
              />
            </div>
            <div>
              <button type='submit' className='btn btn-primary'>Actualizar</button>
              <button type='button' className='btn btn-secondary' onClick={cancel}>Cancelar</button>
            </div>
              
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
