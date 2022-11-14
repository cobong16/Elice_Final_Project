const router = require('express').Router()
const bcrypt = require('bcrypt')

const userSchema = require('../models/UserSchema')

// 메인 페이지
router.get('/', (req, res) => {
    res.render('index.html')
})

// 로그인 POST
router.post('/', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await userSchema.findOne({email: email})

    if (!user) {
        res.redirect('/register')
    } else {
        const valid_password = bcrypt.compare(password, user['password'])

        if (valid_password) {
            req.session.user_name = user['user_name']
            res.redirect('/board')
        } else {
            res.redirect('/')
        }
    }
})

// 세션 종료
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router