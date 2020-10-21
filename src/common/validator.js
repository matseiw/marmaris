const funtions = {};
const unique = (array, name, data) => {
  let returning = false;
  array.forEach((element) => {
    if (element[name] === data) {
      returning = true;
      return
    }
  });
  //   return array[name].some(data);
  return returning;
};

funtions.unique = unique;

export default funtions;
