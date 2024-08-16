import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListAllSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/sessions/');
        setSessions(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
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
        Error fetching sessions: {error.message}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Sessions</h1>
      <ul className="list-group">
        {sessions.map(session => (
          <li key={session.id} className="list-group-item d-flex justify-content-between align-items-center">
            {session.name}
            <Link to={`/sessions/update/${session.id}`} className="btn btn-secondary btn-sm">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListAllSessions;
