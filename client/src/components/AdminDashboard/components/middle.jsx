import React, {useState} from 'react';

const Middle = ({ users }) => {
    return (
        <div className="middle-container">
            <table className="members-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.email || 'none'}</td>
                            <td>
                                <span className={`status ${user.isLocked ? 'locked' : user.isActivated ? 'active' : 'deactivated'}`}>
                                    {user.isLocked ? 'Locked' : user.isActivated ? 'Active' : 'Deactivated'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Middle;