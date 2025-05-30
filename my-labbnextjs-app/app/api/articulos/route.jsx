/*import connectToDatabase from '../../lib/mongodb';
import Articulo from '../../models/Articulo';
import Usuario from '../../models/Usuario';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    await connectToDatabase();

    // Sincronizar contador del autoincremento (articuloId)
    const Counter = mongoose.connection.collection('counters');
    const maxArticulo = await Articulo.findOne().sort({ articuloId: -1 });

    if (maxArticulo) {
      await Counter.updateOne(
        { id: 'Articulo', field: 'articuloId' },
        { $set: { seq: maxArticulo.articuloId } },
        { upsert: true }
      );
    }

    const data = await request.json();
    const { titulo, descripcion, imagen, categoria, usuarioId } = data;

    if (!titulo || !descripcion || !categoria || usuarioId === undefined || usuarioId === null) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const usuarioIdNum = Number(usuarioId);
    if (!Number.isInteger(usuarioIdNum) || usuarioIdNum <= 0) {
      return new Response(
        JSON.stringify({ message: 'usuarioId inválido, debe ser un número entero positivo' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar que no se repita el título
    const tituloExistente = await Articulo.findOne({ titulo: { $regex: `^${titulo}$`, $options: 'i' } });
    if (tituloExistente) {
      return new Response(
        JSON.stringify({ message: 'Ya existe un artículo con ese título' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    
    if (imagen) {
      const imagenExistente = await Articulo.findOne({ imagen });
      if (imagenExistente) {
        return new Response(
          JSON.stringify({ message: 'Ya existe un artículo con esa imagen' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    
    const descripcionExistente = await Articulo.findOne({ descripcion: { $regex: `^${descripcion}$`, $options: 'i' } });
    if (descripcionExistente) {
      return new Response(
        JSON.stringify({ message: 'Ya existe un artículo con esa descripción' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const nuevoArticulo = new Articulo({
      titulo,
      descripcion,
      imagen: imagen || '',
      categoria,
      usuarioId: usuarioIdNum,
      fechaCreacion: new Date(),
    });

    await nuevoArticulo.save();

    return new Response(
      JSON.stringify({ message: 'Artículo creado correctamente' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al crear artículo:', error);
    return new Response(
      JSON.stringify({ message: 'Error al crear artículo' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const titulo = searchParams.get('titulo') || '';
    const categoria = searchParams.get('categoria') || '';
    const fecha = searchParams.get('fecha') || '';

    const filtro = {};

    if (titulo) {
      filtro.titulo = { $regex: titulo, $options: 'i' };
    }

    if (categoria) {
      filtro.categoria = { $regex: categoria, $options: 'i' };
    }

    if (fecha) {
      const inicioDia = new Date(`${fecha}T00:00:00`);
      const finDia = new Date(`${fecha}T23:59:59.999`);
      filtro.fechaCreacion = { $gte: inicioDia, $lte: finDia };
    }

    const articulos = await Articulo.find(filtro).sort({ fechaCreacion: -1 }).lean();

    // Extraer todos los usuarioIds únicos para buscar usuarios
    const usuarioIds = [...new Set(articulos.map(a => a.usuarioId))];

    // Buscar usuarios por usuarioId
    const usuarios = await Usuario.find({ usuarioId: { $in: usuarioIds } })
      .select('usuarioId nombre apellido')
      .lean();

    // Mapear usuarios por usuarioId para fácil acceso
    const usuariosMap = {};
    usuarios.forEach(u => {
      usuariosMap[u.usuarioId] = u;
    });

    const articulosConUsuario = articulos.map(articulo => {
      const usuario = usuariosMap[articulo.usuarioId];
      return {
        ...articulo,
        autor: usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido',
      };
    });

    return new Response(
      JSON.stringify(articulosConUsuario),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error al obtener artículos:', error);
    return new Response(
      JSON.stringify({ message: 'Error al obtener artículos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}*/

import connectToDatabase from '../../lib/mongodb';
import Articulo from '../../models/Articulo';
import Usuario from '../../models/Usuario';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    await connectToDatabase();

    // Sincronizar contador del autoincremento (articuloId)
    const Counter = mongoose.connection.collection('counters');
    const maxArticulo = await Articulo.findOne().sort({ articuloId: -1 });

    if (maxArticulo) {
      await Counter.updateOne(
        { id: 'Articulo', field: 'articuloId' },
        { $set: { seq: maxArticulo.articuloId } },
        { upsert: true }
      );
    }

    const data = await request.json();
    const { titulo, descripcion, imagen, categoria, usuarioId } = data;

    if (!titulo || !descripcion || !categoria || usuarioId === undefined || usuarioId === null) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const usuarioIdNum = Number(usuarioId);
    if (!Number.isInteger(usuarioIdNum) || usuarioIdNum <= 0) {
      return new Response(
        JSON.stringify({ message: 'usuarioId inválido, debe ser un número entero positivo' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar que no se repita el título
    const tituloExistente = await Articulo.findOne({ titulo: { $regex: `^${titulo}$`, $options: 'i' } });
    if (tituloExistente) {
      return new Response(
        JSON.stringify({ message: 'Ya existe un artículo con ese título' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (imagen) {
      const imagenExistente = await Articulo.findOne({ imagen });
      if (imagenExistente) {
        return new Response(
          JSON.stringify({ message: 'Ya existe un artículo con esa imagen' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const descripcionExistente = await Articulo.findOne({ descripcion: { $regex: `^${descripcion}$`, $options: 'i' } });
    if (descripcionExistente) {
      return new Response(
        JSON.stringify({ message: 'Ya existe un artículo con esa descripción' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const nuevoArticulo = new Articulo({
      titulo,
      descripcion,
      imagen: imagen || '',
      categoria,
      usuarioId: usuarioIdNum,
      fechaCreacion: new Date(),
    });

    await nuevoArticulo.save();

    return new Response(
      JSON.stringify({ message: 'Artículo creado correctamente' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al crear artículo:', error);
    return new Response(
      JSON.stringify({ message: 'Error al crear artículo' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const titulo = searchParams.get('titulo') || '';
    const categoria = searchParams.get('categoria') || '';
    const fecha = searchParams.get('fecha') || '';

    const filtro = {};

    if (titulo) {
      filtro.titulo = { $regex: titulo, $options: 'i' };
    }

    if (categoria) {
      filtro.categoria = { $regex: categoria, $options: 'i' };
    }

    if (fecha) {
      const inicioDia = new Date(`${fecha}T00:00:00`);
      const finDia = new Date(`${fecha}T23:59:59.999`);
      filtro.fechaCreacion = { $gte: inicioDia, $lte: finDia };
    }

    const articulos = await Articulo.find(filtro).sort({ fechaCreacion: -1 }).lean();

    if (!Array.isArray(articulos)) {
      console.error('La consulta no devolvió un arreglo:', articulos);
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const usuarioIds = [...new Set(articulos.map(a => a.usuarioId))];

    const usuarios = await Usuario.find({ usuarioId: { $in: usuarioIds } })
      .select('usuarioId nombre apellido')
      .lean();

    const usuariosMap = {};
    usuarios.forEach(u => {
      usuariosMap[u.usuarioId] = u;
    });

    const articulosConUsuario = articulos.map(articulo => {
      const usuario = usuariosMap[articulo.usuarioId];
      return {
        ...articulo,
        autor: usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido',
      };
    });

    console.log('Artículos encontrados:', articulosConUsuario.length);
    return new Response(
      JSON.stringify(articulosConUsuario),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error al obtener artículos:', error.message, error.stack);
    return new Response(
      JSON.stringify({ message: 'Error al obtener artículos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}