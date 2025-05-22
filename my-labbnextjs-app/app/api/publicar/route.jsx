// app/api/publicar/route.jsx

import { connectDB } from '../../utils/db';
import Articulo from '../../models/Articulo'; 

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const { titulo, informacion, categoria } = data;

    if (!titulo || !informacion || !categoria) {
      return new Response(JSON.stringify({ message: 'Campos incompletos' }), { status: 400 });
    }

    const nuevoArticulo = new Articulo({ titulo, informacion, categoria });
    await nuevoArticulo.save();

    return new Response(JSON.stringify({ message: 'Artículo registrado con éxito' }), { status: 201 });

  } catch (error) {
    console.error('Error en POST /api/articulo:', error);
    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
  }
}
