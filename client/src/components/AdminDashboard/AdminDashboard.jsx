import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Top from './components/top';
import Middle from './components/middle';
import Bottom from './components/bottom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/user/getPaginatedUsers`);
                setUsers(response.data.users);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            <Top memberCount={users.length} />
            <Middle users={users} />
            <Bottom /> {/* No pagination needed */}
        </div>
    );
};

export default AdminDashboard;
