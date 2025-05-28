// app/api/notificaciones.jsx
import connectToDatabase from '../../lib/mongodb';
import Notificacion from '../../models/Notificacion';
import mongoose from 'mongoose';

async function sincronizarContadorNotificacion() {
  // Obtener el último notificacionId registrado
  const ultimaNotificacion = await Notificacion.findOne().sort({ notificacionId: -1 }).exec();
  const ultimoId = ultimaNotificacion?.notificacionId || 0;

  const countersCollection = mongoose.connection.collection('counters');

  // Buscar el contador actual de notificaciones
  const counter = await countersCollection.findOne({ _id: 'notificaciones.notificacionId' });

  if (!counter || counter.seq < ultimoId) {
    // Actualizar el contador para que no genere ids duplicados
    await countersCollection.updateOne(
      { _id: 'notificaciones.notificacionId' },
      { $set: { seq: ultimoId } },
      { upsert: true }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const usuarioId = parseInt(searchParams.get('usuarioId'));

    if (!usuarioId) {
      return new Response(JSON.stringify({ message: 'usuarioId es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const notificaciones = await Notificacion.find({ usuarioIdDestino: usuarioId })
      .sort({ fecha: -1 })
      .lean();

    return new Response(JSON.stringify(notificaciones), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    return new Response(JSON.stringify({ message: 'Error del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(request) {
  try {
    await connectToDatabase();

    const { notificacionId } = await request.json();

    if (!notificacionId) {
      return new Response(JSON.stringify({ message: 'notificacionId es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const notificacionActualizada = await Notificacion.findByIdAndUpdate(
      notificacionId,
      { leido: true },
      { new: true }
    );

    if (!notificacionActualizada) {
      return new Response(JSON.stringify({ message: 'Notificación no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Notificación marcada como leída' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar notificación:', error);
    return new Response(JSON.stringify({ message: 'Error del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Nuevo método POST para crear notificaciones, con sincronización
export async function POST(request) {
  try {
    await connectToDatabase();

    const { usuarioIdDestino, mensaje, articuloId } = await request.json();

    if (!usuarioIdDestino || !mensaje) {
      return new Response(
        JSON.stringify({ message: 'usuarioIdDestino y mensaje son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sincronizar el contador para evitar duplicados
    await sincronizarContadorNotificacion();

    const nuevaNotificacion = new Notificacion({
      usuarioIdDestino,
      mensaje,
      articuloId,
    });

    await nuevaNotificacion.save();

    return new Response(
      JSON.stringify({ message: 'Notificación creada correctamente.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al crear notificación:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno en el servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}