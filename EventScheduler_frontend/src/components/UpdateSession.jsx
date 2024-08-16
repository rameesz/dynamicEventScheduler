import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateSession = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [speakers, setSpeakers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/sessions/${id}/`);
        const session = response.data;
        setTitle(session.title);
        setStartTime(session.start_time);
        setEndTime(session.end_time);
        setSpeaker(session.speaker);
      } catch (error) {
        setError('Error fetching session details');
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSpeakers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/speakers/');
        setSpeakers(response.data);
      } catch (error) {
        setError('Error fetching speakers');
        console.error('Error fetching speakers:', error);
      }
    };

    fetchSession();
    fetchSpeakers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/sessions/${id}/`, {
        title,
        start_time: startTime,
        end_time: endTime,
        speaker,
      });
      navigate(`/events/${id}`); // Redirect to the event page
    } catch (error) {
      setError('Error updating session');
      console.error('Error updating session:', error);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Session</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Session Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter session title"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">Start Time</label>
          <input
            type="time"
            id="startTime"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">End Time</label>
          <input
            type="time"
            id="endTime"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="speaker" className="form-label">Speaker</label>
          <select
            id="speaker"
            className="form-select"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            required
          >
            <option value="">Select a speaker</option>
            {speakers.map(speaker => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Session
        </button>
      </form>
    </div>
  );
}

export default UpdateSession;
