// WWTimer.d.ts
export interface TimeInfo {
  currentTime: Date;
  timeElapsed: number;
}

declare class WWTimer {
  /**
   * Creates a timer instance to repeatedly execute a callback function at specified intervals,
   * leveraging Web Workers to run the timing in a background thread without blocking the main thread.
   * 
   * This timer provides control methods to start (play), pause, and destroy the timer instance,
   * allowing for flexible management of the timer's lifecycle. Upon each interval tick, the callback function is executed,
   * receiving an object with the current time and the elapsed time since the last execution.
   * 
   * @param callback Function to be called at each interval tick. Receives an object with `currentTime` (Date object)
   * and `timeElapsed` (milliseconds since last tick).
   * @param interval Interval time in milliseconds between each callback execution. Defaults to 1000ms.
   */
  constructor(callback: (timeInfo: TimeInfo) => void, interval?: number);

  /**
   * Starts the timer.
   */
  play(): void;

  /**
   * Pauses the timer.
   */
  pause(): void;

  /**
   * Permanently stops and cleans up the timer.
   */
  destroy(): void;
}

export default WWTimer;
