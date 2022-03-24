export const isEmpty = (obj: object) => {
  console.log("isEmpty: ", obj);
  return obj && Object.keys(obj).length === 0;
};
