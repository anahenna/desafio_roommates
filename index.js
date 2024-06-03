import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import path from 'path';
import roommateRoutes from './routes/roommate.route.js'
import gastoRoutes from './routes/gasto.route.js'

const app = express()

const __dirname = import.meta.dirname
app.use(express.static(__dirname + '/public'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/roommates', roommateRoutes)
app.use('/api/v1/gastos', gastoRoutes)

app.use('*', (req, res) => {
    res.status(404).json({ok: false, msg: 'ruta no configurada aún 🫥'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor andando en http://localhost:${PORT}`)
})
