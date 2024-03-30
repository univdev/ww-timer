import WWTimer from 'ww-timer';
import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [wwTimer, setWWTimer] = useState<WWTimer>();

  const increaseCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  useEffect(() => {
    setWWTimer(new WWTimer(increaseCount, 1000));

    return () => {
      if (wwTimer) wwTimer.destroy();
    }
  }, [increaseCount]);

  useEffect(() => {
    if (wwTimer) wwTimer.start();
  }, [wwTimer]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
