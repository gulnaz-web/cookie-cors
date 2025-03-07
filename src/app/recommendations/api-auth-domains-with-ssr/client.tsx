'use client';
import { useState } from 'react';
import { baseUrl, baseAuthUrl } from './constants';

export default function Client() {
   const [requestResult, setRequestResult] = useState('');

   const login = async () => {
      const response = await fetch(baseAuthUrl + '/auth/login', {
         method: 'POST',
         credentials: 'include', // need for dev mode
      });
      if (response.status >= 200 && response.status < 300) {
         setRequestResult('login successfully');
      }
   };

   const refresh = async () => {
      const response = await fetch(baseAuthUrl + '/auth/refresh', {
         method: 'POST',
         credentials: 'include', // need for dev mode
      });
      if (response.status >= 200 && response.status < 300) {
         setRequestResult('refresh successfully');
      }
   };

   const messages = async () => {
      const response = await fetch(baseUrl + '/messages', {
         // credentials: 'include' // cookie не отправляем на АПИ
      });

      if (response.status >= 200 && response.status < 300) {
         setRequestResult('messages successfully');
      }
   };

   return (
      <div>
         <h2>Open page via it-gulnaz.xxx or dev.it-gulnaz.xxx</h2>
         <div>
            <h3>To the same domain it-gulnaz.xxx</h3>
            <button onClick={login}>Login</button>
            <button onClick={refresh}>Refresh</button>
            <button onClick={messages}>Messages</button>
            <hr />
         </div>
         <div>{requestResult}</div>
      </div>
   );
}
