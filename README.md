![WW Timer](./banner.jpg)
# Introduce
The 'WW Timer' is a timer for browsers that operate using web workers.
# Why need
Implementing a timer in a browser is challenging for a variety of reasons.
- Accurate time calculation may be difficult depending on the congestion level of the event loop.
- Browser operating in the background does not have 'setInterval' or 'setTimeout' working properly.