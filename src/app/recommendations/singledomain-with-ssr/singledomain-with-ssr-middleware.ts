import { NextRequest, NextResponse } from 'next/server';

const baseUrl = 'https://it-gulnaz.xxx/api/singledomain-with-ssr';

const refresh = async (refreshToken: string) => {
   try {
      const response = await fetch(baseUrl + '/auth/refresh', {
         method: 'POST',
         headers: { cookie: `refresh-token=${refreshToken}` },
      });

      if (response.status >= 200 && response.status < 300) {
         const data = await response.json();
         return {
            accessToken: data.accessToken,
            refreshSetCookie: response.headers.get('set-cookie'),
         };
      } else {
         console.log('ERROR: ' + response.status);
         return null;
      }
   } catch (error) {
      console.error('Fetch error:', error);
      return null;
   }
};

export async function singledomainWithSsrMiddleware(request: NextRequest) {
   console.log(request.cookies);
   const cookie = request.cookies.get('refresh-token');

   const tokens = await refresh(cookie?.value as string);
   const requestHeaders = new Headers(request.headers);
   if (tokens) {
      // Clone the request headers and set a new header `x-hello-from-middleware1`
      requestHeaders.set('Authorization', 'Bearer ' + tokens.accessToken);
   }
   // You can also set request headers in NextResponse.next
   const response = NextResponse.next({
      request: {
         // New request headers
         headers: requestHeaders,
      },
   });

   if (tokens) {
      response.headers.set('Set-Cookie', tokens.refreshSetCookie as string);
   }
   return response;
}
