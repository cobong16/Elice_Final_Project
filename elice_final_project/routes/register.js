const router = require('express').Router()
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const userSchema = require('../models/UserSchema')

// 회원가입 페이지
router.get('/', (req, res) => {
    res.render('register.html')
})

// 회원가입 POST
router.post('/', async (req, res) => {
    // 비밀번호 해쉬화
    const hashed_password = await bcrypt.hash(req.body.password, salt)
    const user_name = req.body.name
    const telephone = req.body.telephone
    const email = req.body.email

    const user_info = {
        user_name: user_name,
        telephone: telephone,
        email: email,
        password: hashed_password
    }

    const register = new userSchema(user_info)

    await register.save((err, result) => {
        if (err) {
            console.error(err)
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router