import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

function DatePickerComponent() {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-purple-500 text-white"
      >
        <FaCalendarAlt className="text-white" />
        Select Date
      </button>
      {isOpen && (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
          className="mt-2"
        />
      )}
    </div>
  );
}

export default DatePickerComponent;