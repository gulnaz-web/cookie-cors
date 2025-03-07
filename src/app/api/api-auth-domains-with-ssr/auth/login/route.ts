// LOGIN (it-gulnaz.xxx)
import { getCORSHeaders } from '@/app/api/cors.helper';
import { setRefreshToken } from '../setRefreshToken';

export async function POST(req: Request) {
   const headers = getCORSHeaders(req, ['https://dev.it-gulnaz.xxx', 'https://it-gulnaz.xxx']);
   setRefreshToken(headers);
   return Response.json({ message: 'token inside cookie' }, { headers });
}
