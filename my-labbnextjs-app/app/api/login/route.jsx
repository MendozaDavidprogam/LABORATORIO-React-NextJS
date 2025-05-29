import connectToDatabase from '../../lib/mongodb';
import Usuario from '../../models/Usuario';

export async function POST(request) {
  try {
    const { nombre, cedula } = await request.json();

    await connectToDatabase();

    const usuario = await Usuario.findOne({ nombre, cedula });

    if (!usuario) {
      return new Response(
        JSON.stringify({ message: 'Usuario o cédula incorrectos.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ usuario }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error interno en el servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}