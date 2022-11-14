import * as _ from "lodash";

export const parseURL = url => {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url;
  }
  return `http://${url}`;
};

export const removeEmptyObject = obj => {
  const object = { ...obj };
  Object.keys(object).forEach(key => {
    if (
      object[key] === undefined ||
      object[key] === "undefined" ||
      object[key] === null ||
      object[key] === ""
    ) {
      delete object[key];
    }

    if (
      (key === "filter" || key === "search") &&
      typeof object[key] === "string"
    ) {
      var filter = _.uniq(object[key].split(",").map(x => x.trim())).join(", ");

      // let filterHasValue = [];
      // filter.split(",").map(k => {
      //   if (object[k]) {
      //     filterHasValue.push(k);
      //   }
      // });
      object[key] = filter;
    }
  });
  return object;
};

export const parseTime = (date, time) => {
  if (!time)
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      0
    );
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
};

export const formatNumber = number => {
  const data = Math.round(Number(number))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return data;
};

export const createArray = (start, end) => {
  if (start && end) {
    const length = Math.floor(Math.abs(end - start)) + 1;
    const arrCreate = Array.from(Array(length), (x, index) => {
      let tenure = start + index;
      if (tenure % 3 === 0) {
        return {
          id: tenure,
          name: tenure
        };
      }
    });
    const arrData = arrCreate.filter(item => item !== undefined);
    return arrData;
  } else {
    return [];
  }
};
