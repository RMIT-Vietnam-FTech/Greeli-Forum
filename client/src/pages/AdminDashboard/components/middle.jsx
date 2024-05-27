import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from "../../../context/ThemeContext";

const Middle = ({ users, onLockUser }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleRowClick = (user) => {
        if (isMobile) {
            setSelectedUser(user);
        }
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="dashboard-middle-container" data-bs-theme={isDarkMode ? "dark" : "light"}>
            {users.length === 0 ? (
                <div className="no-user-found">No user found</div>
            ) : (
                <table className="members-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className='DashboardUserList' onClick={() => handleRowClick(user)}>
                                <td>
                                    <Link to={`/user/${user._id}`} style={{ color: '#0A2A28' }} onClick={(e) => e.stopPropagation()}>
                                        {user.username}
                                    </Link>
                                </td>
                                <td>{user.email || 'none'}</td>
                                <td>
                                    <span className={`status ${user.isLocked ? 'locked' : user.isActivated ? 'active' : 'deactivated'}`}>
                                        {user.isLocked ? 'Locked' : user.isActivated ? 'Active' : 'Deactivated'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLockUser(user._id, user.isLocked);
                                        }}
                                        className={user.isLocked ? 'btn btn-danger' : 'btn btn-warning'}
                                    >
                                        {user.isLocked ? 'Unlock' : 'Lock'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedUser && (
                <div id="userModal" className="dashboard-modal" onClick={handleCloseModal} style={{ display: 'block' }}>
                    <div className="dashboard-modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="dashboard-close" onClick={handleCloseModal}>&times;</span>
                        <h2>{selectedUser.username}</h2>
                        <p>Email: {selectedUser.email}</p>
                        <p>Status: {selectedUser.isLocked ? 'Locked' : selectedUser.isActivated ? 'Active' : 'Deactivated'}</p>
                        <button
                            onClick={() => {
                                onLockUser(selectedUser._id, selectedUser.isLocked);
                                handleCloseModal();
                            }}
                            className={selectedUser.isLocked ? 'btn btn-danger' : 'btn btn-warning'}
                        >
                            {selectedUser.isLocked ? 'Unlock' : 'Lock'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Middle;
