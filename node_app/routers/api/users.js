//@login & register

const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport')

const keys = require('../../config/key')
const User = require('../../models/User')
// $route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: "test"
    })
})

// $route  POST api/users/register
// @desc   返回的请求的json数据
// @access public
router.post('/register', (req, res) => {
    // console.log(req.body);

    //查询是否已经拥有邮箱
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: '邮箱已经被注册'
            })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            //returns //www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=200&r=pg&d=404
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            });
        }
    })
})

// $route  POST api/users/login
// @desc   返回token jwt passport
// @access public
router.post(('/login'), (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: "用户不存在"
                });
            }
            //密码匹配 之前用的genSalt加密 现在使用compare匹配密码
            // Load hash from your password DB.
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //sign 第一个参数是规则 第二个参数是加密名字 第三个是过期时间 第四个是箭头函数

                        const rule = {
                            id: user.id,
                            name: user.name
                        };
                        jwt.sign(rule, keys.secreteOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                        // res.json({
                        //     msg: "success"
                        // });
                    } else {
                        return res.status(400).json({
                            password: "密码错误"
                        });
                    }
                })
        }).catch(err => console.log(err));
})

// $route  GET api/users/current
// @desc   return current
// @access Private
router.get('/current', passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        msg: 'success'
    })
})

module.exports = router;