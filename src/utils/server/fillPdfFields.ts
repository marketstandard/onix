import { PDFDocument } from 'pdf-lib';

interface FieldData {
  [key: string]: string;
}

export const fillPdfFields = async ({
  inputPdf,
  data,
}: {
  inputPdf: Blob;
  data: FieldData;
}): Promise<Uint8Array | null> => {
  const arrayBuffer = await inputPdf.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const form = pdfDoc.getForm();

  // Fill the form fields with the provided data
  Object.keys(data).forEach((fieldName) => {
    const field = form.getField(fieldName);

    if (field) {
      if (field.constructor.name === 'PDFTextField') {
        (field as any).setText(data[fieldName]);
      } else if (field.constructor.name === 'PDFCheckBox') {
        (field as any).check();
      }
    }
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
