import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateSession = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [speakers, setSpeakers] = useState([]);
  const [error, setError] = useState(''); // State for error messages
  const { eventId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/speakers/');
        setSpeakers(response.data);
      } catch (error) {
        setError('Error fetching speakers: ' + (error.response?.data?.msg || 'Unexpected error'));
      }
    };

    fetchSpeakers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/api/events/${eventId}/sessions/add/`, {
        title,
        start_time: startTime,
        end_time: endTime,
        speaker,
      });
      navigate(`/events/${eventId}`); // Use navigate instead of history.push
    } catch (error) {
      setError('Error creating session: ' + (error.response?.data?.msg || 'Unexpected error'));
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Create Session</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row justify-content-center">
        <div className="col-md-8">
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
              Create Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSession;
