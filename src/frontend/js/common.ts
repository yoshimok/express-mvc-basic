// export const clickSubmitAllClear = () => {
//   for (let i = 1; i <= 3; i++) {
//     document.getElementById(`url${i}`)!.value = "";
//   }
// };

export const getFileName = (contentDisposition: string) => {
  const fileName = contentDisposition.substring(
    contentDisposition.indexOf('"') + 1,
    contentDisposition.indexOf('"', contentDisposition.indexOf('"') + 1)
  );
  return fileName;
};

export const splitByLine = (text: string): string[] => {
  return text.split(/\r\n|\n|\r/);
};

export const formatDate = (date: Date | string): string => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Date(date).toLocaleDateString(undefined, options);
};

export const downloadFile = (data: Blob, filename: string): void => {
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, data], { type: "text/csv" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = filename;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
