(() => {
  self.addEventListener('message', (event) => {
    if (typeof event.data !== 'object') {
      throw new Error('Invalid data');
    }

    if (typeof event.data.interval !== 'number') {
      throw new Error('Invalid interval');
    }

    self.setInterval(() => {
      self.postMessage('called');
    }, event.data.interval);
  });
})();
