// models/Categoria.jsx

import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence'; // Usar mongoose-sequence

const AutoIncrement = AutoIncrementFactory(mongoose);

const categoriaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
}, { collection: 'categorias' });

categoriaSchema.plugin(AutoIncrement, { inc_field: 'id' }); 

export default mongoose.models.Categoria || mongoose.model('Categoria', categoriaSchema);
