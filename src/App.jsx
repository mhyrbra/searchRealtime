import { useState, useEffect } from 'react';
import { isOddFn } from './store/IsOdd';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [isOdd, setIsOdd] = useState(null);
  const [num, setNum] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (num === '') {
      setShowMessage(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      const oddFnResult = await isOddFn(Number(num));

      setIsOdd(oddFnResult);
      setShowMessage(true);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(handler);
  }, [num]);

  function inputHandler(event) {
    setNum(event.currentTarget.value);
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label htmlFor='input'>Check your number is odd or even!</label>
        <input type='number' onChange={inputHandler} value={num} id='input' />
      </div>
      {loading && <p>Loading...</p>}
      {showMessage && !loading && (
        <p>
          {num} {isOdd ? 'is Odd' : 'is Even'}
        </p>
      )}
    </>
  );
}

export default App;
