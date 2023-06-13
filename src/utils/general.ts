export const truncateString = (inputStr: string) => {
  if (inputStr.length > 150) {
    return `${inputStr.slice(0, 150)} . . .`;
  }

  return inputStr;
};
