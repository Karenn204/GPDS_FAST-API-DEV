/*var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json([
    { id: 1, name: 'Laptop', stock: 10 },
    { id: 2, name: 'Mouse', stock: 50 }
  ])
})

module.exports = router
*/
var express = require('express')
var router = express.Router()

// Lista de items (simulando base de datos)
const items = [
    { id: 1, name: 'Laptop', stock: 10, price: 999.99 },
    { id: 2, name: 'Mouse', stock: 50, price: 29.99 },
    { id: 3, name: 'Teclado', stock: 30, price: 89.99 }
]

// GET /items - Listar todos
router.get('/', (req, res) => {
    res.status(200).json(items)
})

// NUEVA RUTA: GET /items/:id - Obtener un item específico
// NUEVO Integración 1: Obtener item específico por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const item = items.find(item => item.id === id)
    
    if (item) {
        res.status(200).json(item)
    } else {
        res.status(404).json({ error: 'Item no encontrado' })
    }
})

module.exports = router