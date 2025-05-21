import { connectDB } from '../../utils/db';
import Rol from '../../models/Rol';

export async function GET() {
  await connectDB();
  const roles = await Rol.find().lean();
  return new Response(JSON.stringify(roles), { status: 200 });
}
