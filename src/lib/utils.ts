import { formatDistanceToNow } from "date-fns";

export function dateToNow(date: string) {  
  const formattedDate = formatDistanceToNow(new Date(date));

  return formattedDate;
}