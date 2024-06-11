import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

import './Historia.css';

function Historia() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'productos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchProduct();
  }, [id]);

  const handleBack = () => {
    navigate('/Biblioteca');
  };

  return (
    <>
      
      <div className="historia-container mt-4">
        {product ? (
          <div className="historia-content">
            <h1>{product.titulo}</h1>
            <p>{product.leer}</p>
            <div className="historia-buttons">
              <button type='button' className='btn btn-secondary' onClick={handleBack}>Regresar</button>
              <button type='button' className='btn btn-success'>Me gusta</button>
              <button type='button' className='btn btn-danger'>No me gusta</button>
            </div>
            <div className="comment-box">
              <h4>Comentarios</h4>
              <textarea rows="4" placeholder="Escribe tu comentario aquí..."></textarea>
              <button type='button' className='btn btn-primary mt-2'>Enviar</button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Historia;