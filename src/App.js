import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Inicio/Inicio';
import X from './Biblio/X';
import XD from './Biblio/XD';
import Create from './Biblio/Lista/Create';
import Edit from './Biblio/Lista/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import PrivateRoute from './Authentication/PrivateRoute';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Biblioteca/*" element={<X />} />
          <Route path="/Biblioteca/Historia/:id" element={<XD />} />
          <Route path="/Biblioteca/Crear" element={<Create />} />
          <Route path="/Biblioteca/Editar/:id" element={<Edit />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        <Route
          path="/create"
          element={<PrivateRoute component={Create} />}
        />
        <Route
          path="/edit/:id"
          element={<PrivateRoute component={Edit} />}
        />
        </Routes>
      </Router>
    </div>
  );
}

export default App;