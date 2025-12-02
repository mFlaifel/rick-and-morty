import { Activity, useState } from 'react';
import Counter from './Counter';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <button onClick={() => setIsVisible((v) => !v)}>Toggle Visibility</button>
      {isVisible && <Counter />}
      <Activity mode={isVisible ? 'visible' : 'hidden'}>
        <Counter />
      </Activity>
    </>
  );
}

export default App;
