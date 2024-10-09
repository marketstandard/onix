import { PDFDocument } from 'pdf-lib';

export const loadPdf = async (fileBlob: Blob) => {
  const arrayBuffer = await fileBlob.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  return pdfDoc;
};
