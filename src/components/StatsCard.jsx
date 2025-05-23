import React from 'react';
import { FaRobot } from 'react-icons/fa';

const StatsCard = ({ websites, conversations }) => {
  return (
    <div className="mt-2">
      <div className="d-flex align-items-center justify-content-between p-2 rounded-3"
        style={{
          backgroundColor: 'rgba(255, 140, 0, 0.1)',
          border: '1px solid rgba(255, 140, 0, 0.2)',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div className="d-flex align-items-center">
          <div className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'rgba(255, 140, 0, 0.2)',
              color: '#ff8c00'
            }}
          >
            <FaRobot style={{ fontSize: '1rem' }} />
          </div>
          <div className="d-flex flex-column">
            <span style={{ 
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '500'
            }}>
              Total Websites
            </span>
            <span style={{ 
              fontSize: '1.1rem',
              color: '#ff8c00',
              fontWeight: 'bold'
            }}>
              {websites}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'rgba(255, 140, 0, 0.2)',
              color: '#ff8c00'
            }}
          >
            <FaRobot style={{ fontSize: '1rem' }} />
          </div>
          <div className="d-flex flex-column">
            <span style={{ 
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '500'
            }}>
              Total Conversations
            </span>
            <span style={{ 
              fontSize: '1.1rem',
              color: '#ff8c00',
              fontWeight: 'bold'
            }}>
              {conversations}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 