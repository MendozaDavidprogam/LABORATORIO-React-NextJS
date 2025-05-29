
import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const ArticuloSchema = new mongoose.Schema({
  articuloId: { type: Number, unique: true }, // campo autoincremental
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: String,
  categoria: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  usuarioId: { type: Number, required: true, ref: 'Usuario' },
});

// plugin para autoincrementar 'articuloId'
ArticuloSchema.plugin(AutoIncrement, { inc_field: 'articuloId' });

export default mongoose.models.Articulo || mongoose.model('Articulo', ArticuloSchema, 'articulos');

