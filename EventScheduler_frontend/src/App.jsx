import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';
import ListEvents from './components/ListEvents';
import CreateSession from './components/CreateSession';
import UpdateEvent from './components/UpdateEvent';
import UpdateSession from './components/UpdateSession';
import ListAllSessions from './components/ListAllSessions';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<ListEvents />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/update/:id" element={<UpdateEvent />} />
          <Route path="/sessions/create/:eventId" element={<CreateSession />} />
          <Route path="/sessions/update/:id" element={<UpdateSession />} />
          <Route path="/sessions" element={<ListAllSessions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
