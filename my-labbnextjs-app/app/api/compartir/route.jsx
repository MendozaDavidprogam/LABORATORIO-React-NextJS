import connectToDatabase from '@/app/lib/mongodb';
import Notificacion from '@/app/models/Notificacion';
import Articulo from '@/app/models/Articulo';

export async function POST(request) {
  try {
    await connectToDatabase();

    const { usuarioIdCompartidor, articuloId } = await request.json();

    if (!usuarioIdCompartidor || !articuloId) {
      return new Response(
        JSON.stringify({ message: 'usuarioIdCompartidor y articuloId son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Buscar el artículo
    const articulo = await Articulo.findOne({ articuloId });

    if (!articulo) {
      return new Response(
        JSON.stringify({ message: 'Artículo no encontrado' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // No notificar si el que comparte es el autor
    if (usuarioIdCompartidor === articulo.usuarioId) {
      return new Response(
        JSON.stringify({ message: 'No se genera notificación para el autor que comparte su propio artículo' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear notificación para el autor del artículo
    await Notificacion.create({
      usuarioIdDestino: articulo.usuarioId,
      mensaje: `El usuario con ID ${usuarioIdCompartidor} ha compartido tu artículo: "${articulo.titulo}"`,
      articuloId,
    });

    return new Response(
      JSON.stringify({ message: 'Notificación de compartir creada correctamente.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en POST /articulos/compartir:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno en el servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
