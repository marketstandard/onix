import { PDFDocument } from 'pdf-lib';

interface FormFields {
  [key: string]: string;
}

export const extractPdfFields = async ({ pdfBlob }: { pdfBlob: Blob }) => {
  const arrayBuffer = await pdfBlob.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const form = pdfDoc.getForm();
  const fields: FormFields = {}
    ;
  form.getFields().forEach((field) => {
    const name = field.getName();

    if (field.constructor.name === 'PDFTextField') {
      const textField = form.getTextField(name);
      fields[name] = textField.getText() || '';
    } else if (field.constructor.name === 'PDFCheckBox') {
      const checkBox = form.getCheckBox(name);
      fields[name] = checkBox.isChecked() ? 'Checked' : 'Unchecked';
    }
  });
  return fields;
};
