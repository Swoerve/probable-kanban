const express = require('express')
const path = require('path')
const app = express()

app.get('/api', (_request, response) => {
    response.send({hello: 'World'})
})

app.use(express.static(path.join(path.resolve(), 'dist/browser')))

app.listen(3000, ()=> {
    console.log('Backend ready at http://localhost:3000')
})