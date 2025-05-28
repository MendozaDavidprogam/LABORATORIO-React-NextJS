// models/Notificacion.jsx
import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const NotificacionSchema = new mongoose.Schema({
  notificacionId: { type: Number, unique: true },
  usuarioIdDestino: { type: Number, required: true },
  mensaje: { type: String, required: true },
  articuloId: { type: mongoose.Schema.Types.ObjectId, ref: 'Articulo' }, // Relación con el articulo
  leido: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now },
});

NotificacionSchema.plugin(AutoIncrement, { inc_field: 'notificacionId' });

export default mongoose.models.Notificacion ||
  mongoose.model('Notificacion', NotificacionSchema, 'notificaciones');
