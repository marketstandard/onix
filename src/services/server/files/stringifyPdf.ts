import pdf from 'pdf-parse';

export const stringifyPdf = async (pdfDoc: Blob) => {
  const ab = await pdfDoc.arrayBuffer();
  const b = Buffer.from(ab);

  const data = await pdf(b);
  const text = data.text;

  return text;
};
