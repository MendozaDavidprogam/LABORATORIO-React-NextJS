

import { connectDB } from '../../utils/db';
import Usuario from '../../models/Usuario';

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const { nombre, cedula } = data;  

    if (!nombre || !cedula) {
      return new Response(JSON.stringify({ message: 'Campos incompletos' }), { status: 400 });
    }

    const usuario = await Usuario.findOne({ nombre, cedula });

    if (!usuario) {
      return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Inicio de sesión exitoso' }), { status: 200 });

  } catch (error) {
    console.error('Error en POST /api/login:', error); 
    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
  }
}
