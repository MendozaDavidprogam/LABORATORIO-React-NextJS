// models/Articulo.jsx

import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const articuloSchema = new mongoose.Schema({
  idarticulo: {
    type: Number, // cambia a Number si usas auto-incremento
    unique: true,
  },
  titulo: String,
  informacion: String,
  imagen: String,
  categoria: {
    type: Number,
    required: true,
  },
}, { collection: 'articulos' });

// Auto-incrementa el campo `idarticulo`
articuloSchema.plugin(AutoIncrement, { inc_field: 'idarticulo' });

export default mongoose.models.Articulo || mongoose.model('Articulo', articuloSchema);
