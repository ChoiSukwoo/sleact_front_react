export const EntityToRegistUserDTO = (data: RegistUserDTO) => {
  const newData: RegistUserDTO = {} as RegistUserDTO;
  (Object.keys(data) as Array<keyof RegistUserDTO>).forEach((key) => {
    if (data[key] !== undefined) {
      newData[key] = data[key];
    }
  });
  return newData;
};
