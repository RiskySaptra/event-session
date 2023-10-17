import { _eventData_ } from "@/utils/constant";
import { EventData } from "@/utils/interface";

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const setEventItem = (data: EventData) => {
  return localStorage.setItem("data", JSON.stringify(data));
};

export const getEventItem = () => {
  const data = localStorage.getItem("data");
  if (!data) return _eventData_;
  const parsed = JSON.parse(data || "");
  return parsed;
};
