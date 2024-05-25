import React, {useState} from 'react';  


const Bottom = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="bottom-container">
            <div className="pagination">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index + 1} 
                        className={currentPage === index + 1 ? 'active' : ''} 
                        onClick={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
            </div>
        </div>
    );
};

export default Bottom;
