import { getCORSHeaders } from '@/app/api/cors.helper';

export async function GET(req: Request) {
   const headers = getCORSHeaders(req, ['https://dev.it-gulnaz.xxx', 'https://it-gulnaz.xxx']);

   return Response.json(
      [
         { id: 1, content: 'hello Dimych 2' },
         { id: 2, content: 'card pin code 1111' },
      ],
      { headers },
   );
}
