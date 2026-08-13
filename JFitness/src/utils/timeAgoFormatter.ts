
export function formatNotificationTime(date?: string) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  const now = new Date();

  const isToday =
    parsedDate.getDate() === now.getDate() &&
    parsedDate.getMonth() === now.getMonth() &&
    parsedDate.getFullYear() === now.getFullYear();


  if (isToday) {
    return new Intl.DateTimeFormat("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(parsedDate);
  }


  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}