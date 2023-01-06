// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';

export function App() {
  const [response, setResponse] = useState<any>(null);

  async function fetchAuthenticationStatus() {
    const data = await (
      await fetch('http://localhost:3333/api/protected', {
        credentials: 'include',
        method: 'GET',
      })
    ).json();
    console.log(data);
    setResponse(data);
  }

  return (
    <>
      <button
        onClick={() => {
          fetch('http://localhost:3333/api/login', {
            method: 'post',
            credentials: 'include',
          });
        }}
      >
        authenticate
      </button>
      <button id="button" onClick={() => fetchAuthenticationStatus()}>
        check authentication
      </button>
      {response?.authenticated && <div id="auth">user is authenticated</div>}
    </>
  );
}

export default App;
