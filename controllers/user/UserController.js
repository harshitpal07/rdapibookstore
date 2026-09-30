const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function addUser(req, res) {

    try {

        console.log(req.body)

        let user = await User.findOne({
            email: req.body.email,
            userType: 'user'
        })

        // User already exists
        if (user) {

            return res.status(400).send({
                message: 'user already exists'
            })

        }

        // Hash password
        let password = bcrypt.hashSync(
            req.body.password,
            10
        )

        // Create new user
        let newUser = new User(req.body)

        newUser.password = password

        // Save user
        await newUser.save()

        return res.status(200).send({
            success: true,
            message: 'welcome to our platform'
        })

    } catch (err) {

        console.log(err)

        return res.status(400).send({
            success: false,
            message: 'something went wrong...'
        })
    }
}


async function doUserLogin(req, res) {

    try {

        console.log(req.body)

        // Find user
        let user = await User.findOne({
            email: req.body.email
        })

        // User not found
        if (!user) {

            return res.status(400).send({
                message: 'invalid user/password..'
            })

        }

        // Compare password
        let validUser = await bcrypt.compare(
            req.body.password,
            user.password
        )

        // Wrong password
        if (!validUser) {

            return res.status(400).send({
                message: 'invalid user/password..'
            })

        }

        // Update last login
        user.lastLogin = new Date()

        await user.save()


        // JWT secret key
        let secret_key =
            'b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU'


        // Generate token
        let token = jwt.sign(
            {
                _id: user._id,
                email: user.email
            },
            secret_key,
            {
                expiresIn: '3hr'
            }
        )

        console.log(token, 'token')


        // Response data
        let data = {
            email: user.email,
            name: user.firstName,
            token: token
        }


        return res.status(200).send({
            data: data
        })

    } catch (err) {

        console.log(err)

        return res.status(400).send({
            message: 'something went wrong...'
        })
    }
}


module.exports = {
    addUser,
    doUserLogin
}