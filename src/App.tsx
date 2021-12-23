import React, {useState} from 'react';
import './App.css';
import CountryForm from './CountryForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SingleCountry from './SingleCountry';


const App: React.FC = () => {

  return (
    <div className="App">
      {/* <TodoForm
          handleSubmit={handleSubmit}
          setUsers={setUsers}
      />
      <TodoList users={users}/> */}
      <Router>
      <Routes>
          <Route path="/" element={<CountryForm />}>
          </Route>
          <Route path="/country/:name" element={<SingleCountry />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
