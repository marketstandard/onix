import mime from 'mime';

export const deriveMimeType = (fileExtension: string) => {
  const cleanFileExtension = fileExtension.replace('.', '');

  const type = mime.getType(cleanFileExtension);

  return type;
};
