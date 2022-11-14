// 라이브러리 불러오기
const express = require('express')
const app = express()
const path = require('path')

const indexRouter = require('./routes/index')
const registerRouter = require('./routes/register')
const boardRouter = require('./routes/board')

const mongoose = require('mongoose')
const session = require('express-session')

// 몽구스 연결
require('dotenv').config()
MONGO_URI = process.env.MONGODB_URL
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('Successfully connected to MongoDB') })
    .catch((e) => { console.error(e) })

// app 설정
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// TODO 세션에 등록된 사람들은 게시판 페이지로 이동
app.use(session({
    secret: "elice",
    resave: false,
    saveUninitialized: true
}))

// 라우터 할당
app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/board', boardRouter)

// 포트 개방
const port = 3000
app.listen(port, () => {
    console.log('Server is running at http://localhost:3000')
})