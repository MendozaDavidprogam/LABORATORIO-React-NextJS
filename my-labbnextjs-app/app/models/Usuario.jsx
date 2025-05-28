// models/Usuario.jsx
import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const UsuarioSchema = new mongoose.Schema({
  usuarioId: { type: Number, unique: true },  // campo autoincremental propio
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  rol: { type: Number, ref: 'Rol', required: true },
});

// Aplica el plugin para autoincrementar 'usuarioId'
UsuarioSchema.plugin(AutoIncrement, { inc_field: 'usuarioId' });

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema, 'usuarios');
