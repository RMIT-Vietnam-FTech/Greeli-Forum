import React, { useContext } from 'react';
import { ThemeContext } from "../../../context/ThemeContext";

const Top = ({ memberCount, sortText, onSortChange, onSearchChange }) => {
    const handleSort = (sort, text) => {
        onSortChange(sort, text);
    };

    const handleSearch = (event) => {
        onSearchChange(event.target.value);
    };

    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className="dashboard-top-container" data-bs-theme={isDarkMode ? "dark" : "light"}>
            <div className="members-count">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people PeopleIcon" viewBox="0 0 16 16">
                    <path className="PeopleIconPath" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                </svg>
                <div className='AdminDashBoardMember'>
                    <h2>Members</h2>
                    <p className={`${isDarkMode ? "members-count-dark" : "members-count-light"}`}>{memberCount}</p>
                </div>
            </div>
            <h1 className={`${isDarkMode ? "dashboard-title-dark" : "dashboard-title-light"}`}>DASH BOARD</h1>
            <div className="dashboard-search-sort">
                <div className="dashboard-search-input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${isDarkMode ? "search-icon-dark" : "search-icon-light"} bi bi-search search-icon`} viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search"
                        className={`${isDarkMode ? "dashboard-search-input-dark" : "dashboard-search-input-light"} dashboard-search-input`}
                        onChange={handleSearch}
                    />
                </div>
                <div className="AdminDashBoardDropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {sortText}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#" onClick={() => handleSort('newest', 'Newest')}>Newest</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleSort('oldest', 'Oldest')}>Oldest</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleSort('most-posts', 'Most Posts Created')}>Most Posts Created</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleSort('least-posts', 'Least Posts Created')}>Least Posts Created</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Top;
