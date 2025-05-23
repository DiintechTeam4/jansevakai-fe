import React from 'react';

const RoleSelection = ({ onRoleSelect }) => {
  const roles = [
    {
      id: 'user',
      name: 'User',
      description: 'Regular user access',
      icon: '👤',
      color: 'tw-from-blue-50 tw-to-blue-100',
      hoverColor: 'tw-from-blue-100 tw-to-blue-200',
      iconBg: 'tw-bg-blue-100'
    },
    {
      id: 'client',
      name: 'Client',
      description: 'Client business account',
      icon: '🏢',
      color: 'tw-from-green-50 tw-to-green-100',
      hoverColor: 'tw-from-green-100 tw-to-green-200',
      iconBg: 'tw-bg-green-100'
    },
  ];

  return (
    <div className="d-flex flex-column gap-3">
  {roles.map((role) => (
    <button
      key={role.id}
      onClick={() => onRoleSelect(role.id)}
      className={`w-100 p-4 border border-light rounded bg-light text-start d-flex align-items-center shadow-sm transition ${role.color} ${role.hoverColor}`}
      style={{ transition: 'all 0.3s ease' }}
    >
      <div
        className={`me-3 d-flex align-items-center justify-content-center rounded-circle text-white`}
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: role.iconBg || '#6c757d',
          fontSize: '1.75rem',
        }}
      >
        {role.icon}
      </div>
      <div>
        <h3 className="fw-semibold fs-5 text-white mb-1">{role.name}</h3>
        <p className="text-muted small mb-0">{role.description}</p>
      </div>
    </button>
  ))}
</div>

  );
};

export default RoleSelection; 