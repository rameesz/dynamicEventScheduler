import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/events/');
        setEvents(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-5 text-center">
      <div className="alert alert-danger" role="alert">
        Error fetching events: {error.message}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Events</h1>
      <div className="mb-4">
        <Link to="/events/create" className="btn btn-primary">Create Event</Link>
      </div>
      <ul className="list-group">
        {events.map(event => (
          <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/events/${event.id}`} className="text-decoration-none">{event.name}</Link>
            <Link to={`/events/update/${event.id}`} className="btn btn-secondary btn-sm">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListEvents;
