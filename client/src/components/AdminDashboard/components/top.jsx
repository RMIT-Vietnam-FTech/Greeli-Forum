import React, {useState} from 'react';

const Top = ({ memberCount }) => {
    return (
        <div className="top-container">
            <div className="members-count">
                <h2>Members</h2>
                <p>{memberCount}</p>
            </div>
            <div className="search-sort">
                <input type="text" placeholder="Search" className="search-input" />
                <select className="sort-select">
                    <option value="newest">Sort by: Newest</option>
                    {/* Add more sorting options if needed */}
                </select>
            </div>
        </div>
    );
};

export default Top;
