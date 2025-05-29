import connectToDatabase from '../../lib/mongodb';
import Rol from '../../models/Rol';

export async function GET() {
  await connectToDatabase();
  const roles = await Rol.find({}, '_id nombre descripcion');
  return new Response(JSON.stringify(roles), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
