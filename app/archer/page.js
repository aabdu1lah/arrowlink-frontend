'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function ArcherDashboard() {
  const { user } = useAuth();
  const [myTeam, setMyTeam] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchArcherData = async () => {
      try {
        // Step 1: Find the archer's team by checking all teams
        const { data: allTeams } = await api.get('/teams');
        const foundTeam = allTeams.find(team => 
          team.members.some(member => member.userId === user.userId)
        );
        setMyTeam(foundTeam);

        // Step 2: If a team is found, find events they are registered for
        if (foundTeam) {
          const { data: allEvents } = await api.get('/events');
          const myEvents = allEvents.filter(event => 
            event.registrations.some(reg => reg.teamId === foundTeam.id)
          );
          setRegisteredEvents(myEvents);
        }
      } catch (error) {
        console.error('Failed to fetch archer data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArcherData();
  }, [user]);

  if (loading) return <p>Loading your data...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Archer Dashboard</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">My Team</h2>
        {myTeam ? <p className="text-lg">{myTeam.name}</p> : <p>You are not currently a member of any team.</p>}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upcoming Registered Events</h2>
        {registeredEvents.length > 0 ? (
          <ul className="space-y-3">
            {registeredEvents.map(event => (
              <li key={event.id} className="p-4 bg-gray-700 rounded-md">
                <p className="font-bold">{event.name}</p>
                <p className="text-sm text-gray-400">Date: {new Date(event.startDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your team is not registered for any events.</p>
        )}
      </div>
    </div>
  );
}