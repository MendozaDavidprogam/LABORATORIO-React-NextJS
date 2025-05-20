// app/api/register/route.jsx
import { connectDB } from '../../utils/db';
import Usuario from '../../models/Usuario';


export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const { nombre, apellido, cedula, rol } = data;

    if (!nombre || !apellido || !cedula || !rol) {
      return new Response(JSON.stringify({ message: 'Campos incompletos' }), { status: 400 });
    }

    const nuevoUsuario = new Usuario({ nombre, apellido, cedula, rol });
    await nuevoUsuario.save();

    return new Response(JSON.stringify({ message: 'Usuario registrado con éxito' }), { status: 201 });

  } catch (error) {
    console.error('Error en POST /api/register:', error); // Aquí verás el error en consola
    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
  }
}