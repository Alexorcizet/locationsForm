const express = require('express')
const cors = require('cors')
const formService = require('./service/form.service.js')
const path = require('path')

const app = express()
const http = require('http').createServer(app)

app.use(express.json())
app.use(express.static('public'))

const port = process.env.PORT || 3030

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
        credentials: true,
    }
    app.use(cors(corsOptions))
}

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/api/stationName', async (req, res) => {
    const isMailSent = await formService.sendData(req.body)
    res.send(isMailSent)
})

http.listen(port, () => {
    console.log('Server is running on port: ' + port)
})



