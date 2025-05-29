import connectToDatabase from '../../lib/mongodb';
import Usuario from '../../models/Usuario';
import mongoose from 'mongoose';

// Sincroniza el contador interno de mongoose-sequence con los datos existentes
async function sincronizarContadorUsuario() {
  // Obtener el usuario con el usuarioId mas alto
  const ultimoUsuario = await Usuario.findOne().sort({ usuarioId: -1 }).exec();
  const ultimoId = ultimoUsuario?.usuarioId || 0;

  // Acceder a la coleccion interna usada por mongoose-sequence
  const countersCollection = mongoose.connection.collection('counters');

  // Actualizar el contador solo si el valor actual es menor que el ultimo usuarioId
  const counter = await countersCollection.findOne({ _id: 'usuarios.usuarioId' });

  if (!counter || counter.seq < ultimoId) {
    await countersCollection.updateOne(
      { _id: 'usuarios.usuarioId' },
      { $set: { seq: ultimoId } }, 
      { upsert: true }
    );
  }
}

export async function POST(request) {
  try {
    const { nombre, apellido, cedula, rol } = await request.json();

    await connectToDatabase();

    // Validar que la cedula sea unica
    const existe = await Usuario.findOne({ cedula });
    if (existe) {
      return new Response(
        JSON.stringify({ message: 'La cédula ya está registrada.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    
    const rolNum = Number(rol);
    if (isNaN(rolNum)) {
      return new Response(
        JSON.stringify({ message: 'Rol inválido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sincronizar el contador de usuarioId ANTES de crear el documento
    await sincronizarContadorUsuario();

    
    const usuario = new Usuario({ nombre, apellido, cedula, rol: rolNum });
    await usuario.save();

    return new Response(
      JSON.stringify({ message: 'Usuario registrado correctamente.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno en el servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}