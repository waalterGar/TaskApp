import jwt from "jsonwebtoken";
import { SECRET } from "./config.js";

//funnction to format date to dd-mm-yyyy
export const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
};

export const createToken = (id) => {
  console.log("createToken", id);
  try {
    return jwt.sign({ id: id }, SECRET, { expiresIn: 60 * 60 });
  } catch (error) {
    console.log(error);
  }
};

export function formatDateToMysql(date) {

  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = "" + d.getFullYear();
  let hour = "" + d.getHours();
  let minutes = "" + d.getMinutes();
  let seconds = "" + d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;

  return [year, month, day].join("-") + " " + [hour, minutes, seconds].join(":");
}

