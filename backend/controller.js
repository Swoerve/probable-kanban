const dotenv = require('dotenv')

const pgp = require('pg-promise')(/* options */)

const dbUri = process.env.PGURI
if(dbUri !== undefined){
  console.log('connection string exists');
} else {
  throw new Error('Connection string not found')
}

const db = pgp(dbUri)

// sets up the database for us
async function setup() {
  // these drop the old tables
  await db.none(`DROP TABLE IF EXISTS tasks`)
    .then((data) => {
      console.log('DATA:', data)
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })

  await db.none(`DROP TABLE IF EXISTS columns`)
    .then((data) => {
      console.log('DATA:', data)
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })

  await db.none(`DROP TABLE IF EXISTS boards`)
    .then((data) => {
      console.log('DATA:', data)
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })

  // here we start recreating them
  await db.none(`CREATE TABLE IF NOT EXISTS boards (
        id SERIAL PRIMARY KEY,
        title varchar NOT NULL
        )`)
    .then((data) => {
      console.log('DATA:', data)
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })

  await db.none(`CREATE TABLE IF NOT EXISTS columns (
        id SERIAL PRIMARY KEY,
        board_id INTEGER REFERENCES boards ON DELETE CASCADE,
        title varchar NOT NULL
        )`)
    .then((data) => {
      console.log('DATA:', data)
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })

  await db.none(`CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        board_id INTEGER REFERENCES boards ON DELETE CASCADE,
        column_id INTEGER REFERENCES columns ON DELETE CASCADE,
        title varchar NOT NULL,
        description text
        )`)
    .then((data) => {
      console.log('DATA:', data)
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
}

async function getBoard(req, res) {
  console.log('incoming board request');
  
  await db.one(`SELECT * FROM boards WHERE id = $1`, req.params.id)
    .then((data) => {
      res.json({
        id: data.id,
        title: data.title
      })
    })
}

async function getColumns(req, res) {
  console.log('incoming columns request');
  
  await db.many(`SELECT * FROM columns WHERE board_id = $1`, req.params.id)
    .then((data) => {
      console.log(data)
      let payload = []
      data.forEach(d => {
        payload.push({
          id: d.id,
          title: d.title,
          tasks: []
        })
      })
      res.json({data: payload})
    })
}

async function getTasks(req, res) {
  console.log('incoming tasks request');
  
  await db.many(`SELECT * FROM tasks WHERE column_id = $1`, req.params.id)
    .then((data) => {
      console.log(data)
      let payload = []
      data.forEach(d => {
        payload.push({
          id: d.id,
          title: d.title,
          boardId: d.board_id,
          columnId: d.column_id,
          description: d.description
        })
      })
      res.json({data: payload})
    })
}

// sets up the database tables
setup()

module.exports = {
  getBoard,
  getColumns,
  getTasks
}