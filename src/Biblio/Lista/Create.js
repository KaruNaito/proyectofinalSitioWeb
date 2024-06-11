import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Create = () => {
  const [titulo, setTitulo] = useState('');
  const [leer, setLeer] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const productsCollection = collection(db, 'productos');

  const store = async (e) => {
    e.preventDefault();
    if (user) {
      await addDoc(productsCollection, { titulo, autor: user.uid, leer });
      navigate('/Biblioteca');
    } else {
      alert('Debes iniciar sesión para crear una historia.');
      navigate('/signin');
    }
  };
  const cancel = () => {
    navigate('/Biblioteca');
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Agregar nueva Historia</h1>
          <form onSubmit={store}>
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
              <button type='submit' className='btn btn-primary'>Crear</button>
              <button type='button' className='btn btn-secondary' onClick={cancel}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
