import React from "react";

export const CardComponent = ({ label, count, IconComponent }) => {
  return (
    <div className="admin-card">
      <div className="card-inner">
        {label}
        <IconComponent className="card-iron" />
      </div>
      <h3>{count}</h3>
    </div>
  );
};
