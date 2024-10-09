export const formatBytes = (bytes: number) => {
  if (bytes >= 1e9) {
    return (bytes / 1e9).toFixed(2) + ' GB';
  } else if (bytes >= 1e6) {
    return (bytes / 1e6).toFixed(2) + ' MB';
  } else if (bytes >= 1e3) {
    return (bytes / 1e3).toFixed(2) + ' KB';
  } else {
    return bytes + ' Bytes';
  }
};
