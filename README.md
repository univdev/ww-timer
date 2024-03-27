![WW Timer](./banner.jpg)
# WW Timer
WW Timer is a highly accurate timer library for web browsers.

## Why It's Needed
Typically, when implementing timer functionality in web browsers, the `setTimeout` or `setInterval` methods are used. However, due to the nature of JavaScript's execution model, achieving precise time measurement can be challenging.

JavaScript's asynchronous functions are subject to delays depending on the number of tasks the web browser is executing. This can result in the `setTimeout` and `setInterval` functions being deprioritized in the event loop, which, while generally inconsequential for standard functionality, can introduce critical errors in timing accuracy for timer implementations.

## Solution
The solution lies in utilizing the [Web Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) supported by browsers. Since Web Workers operate independently of the browser's main thread, they are not affected by the complexity of the tasks being executed in the web app. This independence allows for more accurate time measurements, irrespective of the main thread's load.

## Features
- **Accuracy**: Provides highly accurate timing by circumventing the event loop's congestion.
- **Independence**: Operates separately from the main thread, ensuring timer precision is maintained.
- **Ease of Use**: Designed to be straightforward to implement within any web application.

## Installation
```sh
# npm
npm install ww-timer
# yarn
yarn add ww-timer
```

## Quick Start
```javascript
// Import WW Timer
import WWTimer from 'ww-timer';

// Create a new timer
const timer = new WWTimer();

// Start the timer with a callback function
timer.start(() => {
  console.log('Timer tick');
});

// Stop the timer
timer.stop();
```

## API Reference
- `start(callback, interval)`: Starts the timer with the specified callback function and interval.
- `stop()`: Stops the timer.

## Compatibility
Compatible with most modern web browsers that support the Web Workers API.

## Contributing
Contributions to the WW Timer project are welcome. Please refer to the CONTRIBUTING.md file for more details.

## License
WW Timer is released under the MIT License. See the LICENSE file for more information.
