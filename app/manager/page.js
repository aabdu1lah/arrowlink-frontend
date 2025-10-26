'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../lib/api';

export default function ManagerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch events.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Event Management</h2>
        <Link href="/events/create" className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
            + Create New Event
        </Link>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Your Events</h3>
        {events.length > 0 ? (
            <ul className="space-y-3">
            {events.map((event) => (
                <li key={event.id} className="p-4 bg-gray-700 rounded-md flex justify-between items-center">
                    <div>
                        <p className="font-bold text-lg">{event.name}</p>
                        <p className="text-sm text-gray-400">Starts: {new Date(event.startDate).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/events/${event.id}`} className="text-blue-400 hover:underline">
                        View Details
                    </Link>
                </li>
            ))}
            </ul>
        ) : (
            <p>You have not created any events yet.</p>
        )}
      </div>
    </div>
  );
}