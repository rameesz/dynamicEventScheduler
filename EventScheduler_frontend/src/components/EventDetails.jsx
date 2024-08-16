import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [sessions, setSessions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`);
        setEvent(response.data);
        setSessions(response.data.sessions);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{event.title}</h1>
      <p className="mb-3"><strong>Description:</strong> {event.description}</p>
      <p className="mb-3"><strong>Start Date:</strong> {new Date(event.start_date).toLocaleDateString()}</p>
      <p className="mb-3"><strong>End Date:</strong> {new Date(event.end_date).toLocaleDateString()}</p>
      <p className="mb-3"><strong>Location:</strong> {event.location}</p>
      <Link to={`/sessions/create/${id}`} className="btn btn-primary mb-4">
        Add Session
      </Link>
      <h2 className="mb-3">Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions available for this event.</p>
      ) : (
        <ul className="list-group">
          {sessions.map(session => (
            <li key={session.id} className="list-group-item d-flex justify-content-between align-items-center">
              {session.title}
              <Link to={`/sessions/update/${session.id}`} className="btn btn-warning btn-sm">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventDetails;
