const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')

router.post('/users',  async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        sendWelcomeEmail(user.email, user.name)
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.get('/users', auth, async (req, res) => {

    try{
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})


router.post('/users/login', async (req, res) => {
    const body = req.body
    try {
        const user = await User.findByCredentials(body.email, body.password)

        const token = await user.generateAuthToken()

        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token )
        await req.user.save()
        res.send()

    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }

})

router.get('/users/me', auth, (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/users/me' , auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )

    if (!isValidOperation) {
        return res.send(400).send({
            error: 'Invalid Updates'
        })
    }

    const body = req.body

    try {

        const user = req.user
        updates.forEach((update) => user[update]  = body[update] )

        await user.save()

        // const user = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb){

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('The file should be jpg or jpeg or png'))
        }

        cb(undefined, true)

    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=> {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.send()
},  (error, req, res, next) => {
     res.status(400).send(error.message)
})

router.delete('/users/me/avatar', auth, async (req, res) => {
     req.user.avatar = undefined

    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
             throw new Error('no avatar found')
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send(e)
    }

})

module.exports = router