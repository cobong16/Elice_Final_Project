const router = require('express').Router()
const postSchema = require('../models/Post')
const asyncHandler = require('../utils/async-handler')

// 로그인 상태 확인 미들웨어
const isLogin = (req, res ,next) =>{
    if (req.session.user_name) {
        next()
    } else {
        res.redirect('/')
    }
}

// 게시판 전체 확인
router.get('/', isLogin, asyncHandler(async (req, res) => {
    if (req.query.write) {
        res.render('./boards/edit.html', { write: true })
        return
    }

    const page = Number(req.query.page || 1)
    const perPage = Number(req.query.perPage || 10)

    const [total, posts] = await Promise.all([
        postSchema.countDocuments({}),
        postSchema
            .find({})
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage),
    ])

    const totalPage = Math.ceil(total / perPage)

    res.render('./boards/board.html', { posts, page, perPage, totalPage, user_name: req.session.user_name })
}))

// 게시판 글 하나 확인
router.get('/:shortId', isLogin, async (req, res) => {
    const { shortId } = req.params
    const post = await postSchema.findOne({ shortId })

    // 수정
    if (req.query.edit) {
        res.render('./boards/edit.html', { post, write: false})
        return
    }

    // 삭제
    if (req.query.delete) {
        const { shortId } = req.params
        console.log(shortId)
        await postSchema.deleteOne({ shortId })
        res.redirect('/board')
    }

    res.render('./boards/post.html', { post, user_name: req.session.user_name })
})

// 게시글 생성
router.post('/', isLogin, asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new Error('제목과 내용을 입력 해 주세요');
    }

    const id = req.session.user_name
    const post = await postSchema.create({ title, content, user_name: id });
    res.redirect(`/board/${post.shortId}`);
}));

// 게시글 수정
router.post('/:shortId', isLogin, asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        throw new Error('제목과 내용을 입력 해 주세요');
    }

    await postSchema.updateOne({ shortId }, { title, content });
    res.redirect(`/board/${shortId}`);
}));

// 게시글 삭제
// router.delete('/:shortId', isLogin, asyncHandler(async (req, res) => {
//     const { shortId } = req.params
//     console.log(shortId)
//     await postSchema.deleteOne({ shortId })
//     res.redirect('/board')
// }))

module.exports = router