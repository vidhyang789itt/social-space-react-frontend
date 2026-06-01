export const canDeleteForEveryone = (messageCreatedAt: string): boolean => {
  const messageTime = new Date(messageCreatedAt).getTime();
  const currentTime = new Date().getTime();
  const fifteenMinutesInMs = 15 * 60 * 1000;
  
  return (currentTime - messageTime) < fifteenMinutesInMs;
};

export const getTimeRemainingToDelete = (messageCreatedAt: string): number => {
  const messageTime = new Date(messageCreatedAt).getTime();
  const currentTime = new Date().getTime();
  const fifteenMinutesInMs = 15 * 60 * 1000;
  
  const timeRemaining = fifteenMinutesInMs - (currentTime - messageTime);
  return timeRemaining > 0 ? timeRemaining : 0;
};

export const formatTimeRemaining = (ms: number): string => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};