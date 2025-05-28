// models/Comentario.jsx
import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const ComentarioSchema = new mongoose.Schema({
  comentarioId: { type: Number, unique: true },
  articuloId: { type: Number, required: true, ref: 'Articulo' },
  usuarioId: { type: Number, required: true, ref: 'Usuario' },
  nombreUsuario: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  respuestas: [
    {
      usuarioId: { type: Number, required: true },
      nombreUsuario: { type: String, required: true },
      descripcion: { type: String, required: true },
      fecha: { type: Date, default: Date.now },
    },
  ],
});

ComentarioSchema.plugin(AutoIncrement, { inc_field: 'comentarioId' });

export default mongoose.models.Comentario ||
  mongoose.model('Comentario', ComentarioSchema, 'comentarios');
