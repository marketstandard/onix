/**
 * taken from
 * @see https://github.com/KarimMokhtar/react-drag-drop-files/blob/dev/src/utils.ts
 * @todo adjust
 */

/**
 *
 * @param {number} size
 * @returns {number} a size value in mb
 *
 * @example
 * getFileSizeMb(2545133) --> 2.545133
 */
export const getFileSizeMb = (size: number): number => {
  return size / 1000 / 1000;
};

/**
 *
 * @param {File} file
 * @param {string[]} types
 * @returns {boolean} result of type check
 *
 * @example
 * checkType({lastModified: 1680549815173, name: "foo.txt"​, size: 3, type: "text/plain",​ webkitRelativePath: ""}, ['jpeg']) --> false
 */

export const checkType = (file: File, types: string[]): boolean => {
  const extension: string = file.name.split('.').pop() as string;
  const loweredTypes = types.map((type) => type.toLowerCase());

  return loweredTypes.includes(extension.toLowerCase());
};

/**
 * Get the files for input "accept" attribute
 * @param types - Allowed types
 * @returns string
 */
export const acceptedExt = (types: string[] | undefined) => {
  if (types === undefined) return '';
  return types.map((type) => `.${type.toLowerCase()}`).join(',');
};
