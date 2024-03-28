/**
 * The WWTimer class leverages Web Workers to run a timer in a background thread,
 * enabling the repeated execution of a callback function at specified
 * intervals without blocking the main thread.
 *
 * This class offers methods to start, pause, and destroy the timer,
 * providing flexible management of the timer's lifecycle.
 * Upon each interval tick, the provided callback function is executed,
 * receiving an object containing the current time and the elapsed time since the last execution.
 *
 * @example
 * const timer = new WWTimer((timeInfo) => {
 *   console.log(`Current Time: ${timeInfo.currentTime}, Elapsed: ${timeInfo.timeElapsed}`);
 * }, 1000);
 * timer.start(); // Starts the timer
 * timer.pause(); // Pauses the timer
 * timer.destroy(); // Stops and cleans up the timer
 *
 * @class
 * @param {Function} callback -
 * Function to be called at each interval tick. The callback receives an object with two properties:
 * `currentTime` (a Date object representing the current time) and
 * `timeElapsed` (the milliseconds elapsed since the last tick).
 * @param {number} [interval=1000] -
 * The interval time in milliseconds between each callback execution. Defaults to 1000 milliseconds.
 * @throws {Error} Throws an error if `callback` is not a function,
 * indicating that a callback function is required.
 * @throws {Error} Throws an error if `interval` is less than or equal to 1,
 * indicating that the interval must be greater than 1 millisecond.
 */
import { getWorkerURI } from './factories/get-worker-uri';
import { worker } from './worker';

class WWTimer {
  lastTime = Date.now();

  isActive = false;

  wwInstance = null;

  constructor(callback, interval = 1000) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required.');
    }
    if (interval <= 1) {
      throw new Error('Interval must be greater than 1.');
    }

    this.lastTime = Date.now();
    this.isActive = false;
    this.workerURI = getWorkerURI(worker);

    this.wwInstance = new Worker(this.workerURI);

    this.wwInstance.postMessage({ interval });

    this.wwInstance.addEventListener('message', (event) => {
      if (event.data === 'called' && this.isActive) {
        const elapsedTime = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        callback({ currentTime: new Date(), timeElapsed: elapsedTime });
      }
    });
  }

  /**
   * Starts the timer.
   * The timer begins calling the provided callback function at the specified intervals.
   */
  start() {
    this.isActive = true;
  }

  /**
   * Pauses the timer.
   * The callback function will not be called until the timer is restarted with `start`.
   */
  pause() {
    this.isActive = false;
  }

  /**
   * Permanently stops and cleans up the timer. This cannot be undone.
   */
  destroy() {
    this.wwInstance.terminate();
  }
}

export default WWTimer;
