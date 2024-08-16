import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/home/');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
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
        Error fetching data: {error.message}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Home Page</h1>
      <div className="card">
        <div className="card-body">
          <pre className="bg-light p-3 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default Home;
