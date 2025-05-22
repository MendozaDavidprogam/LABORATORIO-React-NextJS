// models/Articulo.jsx

import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const connection = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(mongoose);

const articuloSchema = new mongoose.Schema({
  titulo: String,
  informacion: String,
  categoria: {
    type: Number,
    required: true,    
  },
}, { collection: 'articulos' });

articuloSchema.plugin(AutoIncrement, { inc_field: 'articuloId' });

export default mongoose.models.Articulo || mongoose.model('Articulo', articuloSchema);

