export const minutesToSeconds = (minutes) => {
  return minutes * 60;
};

export const formatTime = (seconds) => {
  const normalizedSeconds = Math.max(0, seconds);
  const minutesPart = Math.floor(normalizedSeconds / 60);
  const secondsPart = normalizedSeconds % 60;

  const paddedMinutes = String(minutesPart).padStart(2, "0");
  const paddedSeconds = String(secondsPart).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
};
