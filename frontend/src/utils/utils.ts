export const strDateFormat = (str?: string): string => {
  return str ? new Date(str).toDateString() : "";
};

/**
 *
 * @param str date string
 * @returns formatted date string. ex: Mar 27 at 6:48 PM
 */
export const strDateFormatMAT = (str?: string): string => {
  if (!str) return "";

  const date = new Date(str);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return dateFormatter.format(date).replace(",", " at");
};

export const inputChange =
  (setInput: (str: string) => void) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

export const isValidIdFor = ({ id }: { id: number }) => id >= 0;
