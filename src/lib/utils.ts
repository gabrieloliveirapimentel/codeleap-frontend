import { formatDistanceToNow } from "date-fns";

export function dateToNow(date: string) {  
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true
  });

  return formattedDate;
}