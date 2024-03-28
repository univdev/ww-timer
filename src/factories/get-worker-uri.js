/**
 *
 * @param {string} workerScript
 */
export const getWorkerURI = (workerScript) => {
  if (typeof workerScript !== 'string') {
    throw new Error('Worker script must be a string');
  }

  const blob = new Blob([workerScript], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);

  window.setTimeout(() => URL.revokeObjectURL(url));

  return url;
};
