import mongoose from "mongoose";

const movimientoSchema = new mongoose.Schema({
    monto: Number,
    moneda: String,
    destinatario: String,
    descripcion: String
}, {timestamps: {createdAt: true, updatedAt: false}})

const cuentaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    saldoPesos: Number,
    saldoDolares: Number,
    alias: String,
    cbu: String,
    movimientos: [movimientoSchema]
})



const cuentaModel = mongoose.model('cuenta', cuentaSchema)

export default cuentaModel