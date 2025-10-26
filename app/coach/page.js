'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function CoachDashboard() {
  const { user } = useAuth();
  const [myTeam, setMyTeam] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        // Fetch all teams to find the one coached by the current user
        const { data: allTeams } = await api.get('/teams');
        const coachTeam = allTeams.find(team => team.coachId === user.userId);
        setMyTeam(coachTeam);

        // Fetch all events
        const { data: allEvents } = await api.get('/events');
        setEvents(allEvents);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);
  
  const handleRegister = async (eventId, teamId) => {
    try {
      await api.post(`/events/${eventId}/register`, { teamId: teamId, boardNumber: 0 }); // Assuming boardNumber is optional for now
      alert('Team registered successfully!');
      // TODO: Re-fetch or update state to reflect registration
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to register team.');
    }
  };

  const handleDeregister = async (eventId, teamId) => {
    try {
        await api.delete(`/events/${eventId}/deregister/${teamId}`);
        alert('Team deregistered successfully!');
        // TODO: Re-fetch or update state
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to deregister team.');
    }
  };


  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Coach Dashboard</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">My Team</h2>
        {myTeam ? <p className="text-lg">{myTeam.name}</p> : <p>You have not created a team yet. Go to the Teams page to create one.</p>}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Available Events</h2>
        <ul className="space-y-4">
          {events.map(event => {
            const isRegistered = event.registrations?.some(reg => reg.teamId === myTeam?.id);
            return (
              <li key={event.id} className="p-4 bg-gray-700 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{event.name}</p>
                  <p className="text-sm text-gray-400">Starts: {new Date(event.startDate).toLocaleDateString()}</p>
                </div>
                {myTeam && (
                  isRegistered ? (
                    <button onClick={() => handleDeregister(event.id, myTeam.id)} className="px-3 py-1 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
                      Deregister
                    </button>
                  ) : (
                    <button onClick={() => handleRegister(event.id, myTeam.id)} className="px-3 py-1 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Register Team
                    </button>
                  )
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}