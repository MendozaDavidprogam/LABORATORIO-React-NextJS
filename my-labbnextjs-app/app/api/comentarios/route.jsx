import connectToDatabase from '../../lib/mongodb';
import Comentario from '../../models/Comentario';
import Articulo from '../../models/Articulo';
import Notificacion from '../../models/Notificacion';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const {
      articuloId,
      usuarioId,
      nombreUsuario,
      descripcion,
      comentarioIdPadre,
    } = data;

    if (!articuloId || !usuarioId || !nombreUsuario || !descripcion) {
      return new Response(JSON.stringify({ message: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const articulo = await Articulo.findOne({ articuloId });

    if (!articulo) {
      return new Response(JSON.stringify({ message: 'Artículo no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Si es una respuesta
    if (comentarioIdPadre) {
      const comentarioPadre = await Comentario.findOne({ comentarioId: comentarioIdPadre });

      if (!comentarioPadre) {
        return new Response(JSON.stringify({ message: 'Comentario padre no encontrado' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      comentarioPadre.respuestas.push({
        usuarioId,
        nombreUsuario,
        descripcion,
        fecha: new Date(),
      });

      await comentarioPadre.save();

      // Notificar al autor del comentario original
      if (comentarioPadre.usuarioId !== usuarioId) {
        await Notificacion.create({
          usuarioIdDestino: comentarioPadre.usuarioId,
          mensaje: `${nombreUsuario} respondió a tu comentario en el artículo "${articulo.titulo}"`,
        });
      }

      return new Response(JSON.stringify({ message: 'Respuesta agregada correctamente' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Comentario nuevo
    const Counter = mongoose.connection.collection('counters');
    const maxComentario = await Comentario.findOne().sort({ comentarioId: -1 });

    if (maxComentario) {
      await Counter.updateOne(
        { id: 'comentarioId', reference_value: null },
        { $set: { seq: maxComentario.comentarioId } },
        { upsert: true }
      );
    }

    const nuevoComentario = new Comentario({
      articuloId,
      usuarioId,
      nombreUsuario,
      descripcion,
      fecha: new Date(),
      respuestas: [],
    });

    await nuevoComentario.save();

    // Notificar al autor del artículo
    if (articulo.usuarioId !== usuarioId) {
      await Notificacion.create({
        usuarioIdDestino: articulo.usuarioId,
        mensaje: `${nombreUsuario} comentó tu artículo "${articulo.titulo}"`,
      });
    }

    return new Response(JSON.stringify({ message: 'Comentario creado correctamente' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en POST /comentarios:', error);
    return new Response(JSON.stringify({ message: 'Error del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const articuloId = parseInt(searchParams.get('articuloId'));

    if (!articuloId) {
      return new Response(JSON.stringify({ message: 'articuloId es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const comentarios = await Comentario.find({ articuloId })
      .sort({ fecha: 1 })
      .lean();

    return new Response(JSON.stringify(comentarios), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en GET /comentarios:', error);
    return new Response(JSON.stringify({ message: 'Error del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
