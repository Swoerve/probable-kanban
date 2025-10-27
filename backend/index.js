const express = require('express')
const path = require('path')
const app = express()

const routes = require('./router')

// app.get('/api', (_request, response) => {
//     response.send({hello: 'World'})
// })

app.use('/api', express.json())

app.use('/api', routes)

app.use(express.static(path.join(path.resolve(), 'dist/frontend/browser')))

app.listen(3000, ()=> {
    console.log('Backend ready at http://localhost:3000')
})