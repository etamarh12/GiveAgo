import React, { useEffect, useState } from 'react';

const ElapsedTimeCounter = ({ createdTime, endedTime }) => {
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const updateElapsedTime = () => {
      const startTime = new Date(createdTime);
      const currentTime = endedTime ? new Date(endedTime) : new Date();
      const elapsedTime = currentTime - startTime;

      const formattedElapsedTime = formatElapsedTime(elapsedTime);

      setTimeElapsed(formattedElapsedTime);
    };

    const intervalId = setInterval(updateElapsedTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [createdTime, endedTime]);

  const formatElapsedTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} שעות ${minutes} דקות ${remainingSeconds} שניות`;
  };

  return <div>{!endedTime && <div>{timeElapsed}</div>}</div>;
};

export default ElapsedTimeCounter;