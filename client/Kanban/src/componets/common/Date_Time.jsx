import React, { useEffect, useState } from "react";

function Date_Time() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <div className="mr-4">
      <p>
        <strong> {date.toLocaleTimeString()} </strong>
      </p>
      <p className="text-center">
        <strong>{date.toLocaleDateString()}</strong>
      </p>
    </div>
  );
}

export default Date_Time;
