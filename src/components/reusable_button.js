import React from 'react';

function Button({ name, color, onClick }) {
  return (
    <button className={`px-4 py-2 font-semibold rounded-lg ${color}`} onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;