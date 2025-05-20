// models/Rol.jsx
import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
}, { collection: 'rol' }); 

export default mongoose.models.Rol || mongoose.model('Rol', rolSchema);
