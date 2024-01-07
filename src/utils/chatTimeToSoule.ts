const NINE_HOURS_MS = 9 * 60 * 60 * 1000;

const chatTimeToSoule = <T extends IChat | IDM>(chat: T) => {
  const orgTime = new Date(chat.createdAt).getTime();
  const modofyTime = orgTime - NINE_HOURS_MS;
  const modofyTimeDate = new Date(modofyTime);
  return {
    ...chat,
    createdAt: modofyTimeDate,
  } as T;
};

export default chatTimeToSoule;
