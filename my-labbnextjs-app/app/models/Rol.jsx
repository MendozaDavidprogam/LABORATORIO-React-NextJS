// models/Rol.jsx
import mongoose from 'mongoose';

const RolSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, // id numerico
  nombre: { type: String, required: true },
  descripcion: String,
}, { _id: false }); // Evitar id automatico ObjectId

export default mongoose.models.Rol || mongoose.model('Rol', RolSchema, 'rol');
