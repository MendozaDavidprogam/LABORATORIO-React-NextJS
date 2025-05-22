// app/api/categorias/route.jsx

import { connectDB } from '../../utils/db';
import Categoria from '../../models/Categoria';

export async function GET() {
  await connectDB();
  const categorias = await Categoria.find().lean();
  return new Response(JSON.stringify(categorias), { status: 200 });
}
