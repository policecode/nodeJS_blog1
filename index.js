const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! Hoang Dat')
})

app.listen(port, () => {
  console.log(`Ứng dụng đang nghe trên cổng localhost:${port}`)
})