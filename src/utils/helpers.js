export const isEmpty = (arg) => {
  const checkProperties = (obj) => {
    for (var key in obj) {
      if (obj[key] === null || obj[key] === "") {
        return true;
      }
    }
    return false;
  };

  return (
    arg == null || // Check for null or undefined
    arg.length === 0 || // Check for empty String (Bonus check for empty Array)
    (typeof arg === "object" && (Object.keys(arg).length === 0 || checkProperties(arg))) // Check for empty Object or Array
  );
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) {
    return "0 B";
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const containsDoubleByte = (arg) => {
  const regex = /[^\u0000-\u00ff]/;

  if (!arg.length) return false;
  if (arg.charCodeAt(0) > 255) return true;
  return regex.test(arg);
};