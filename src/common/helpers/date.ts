export const changeDayToString = (date: Date) => {
  let day = "" + date.getDate();
  let month = "" + (date.getMonth() + 1);
  let year = date.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  const newdate = [day, month, year].join("/");
  return newdate;
};

export const changeStringToDate = (data: any) => {
  const [day, month, year] = data.split("/");
  const date = new Date(+year, month - 1, +day);
  return date;
};

export const getDayOfTime = (d1, d2) => {
  let ms1 = d1.getTime();
  let ms2 = d2.getTime();
  return Math.ceil((ms1 - ms2) / (24 * 60 * 60 * 1000));
};
