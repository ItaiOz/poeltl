import { useEffect, useState } from "react";

export const RunningClock = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set the time to midnight

    const timeDifference = midnight - now; // Difference in milliseconds

    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((timeDifference / 1000) % 60)
      .toString()
      .padStart(2, "0");

    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = getTimeUntilMidnight();
      setTimeRemaining(remainingTime);

      // Clear interval when the countdown reaches midnight
      if (
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0
      ) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <p>
      {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}
    </p>
  );
};
