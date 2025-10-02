/* eslint-disable @typescript-eslint/no-explicit-any */
const randomIndex = (array: any[]) => {
  const tempArray = [...array];
  const count = array.length;
  for (let i = count - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * i + 1);
    const temp = tempArray[i];
    tempArray[i] = tempArray[random];
    tempArray[random] = temp;
  }
  console.log(tempArray);
  return tempArray;
};

export default randomIndex;
