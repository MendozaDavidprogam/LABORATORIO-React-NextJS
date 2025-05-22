// models/Usuario.jsx
// models/Usuario.jsx
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  cedula: String,
  rol: {
    type: Number, 
    required: true,
  },
}, { collection: 'Usuarios' });

export default mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
