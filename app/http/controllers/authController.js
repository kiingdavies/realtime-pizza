const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customers/orders'
    }

    return {
        login(req, res) {
            res.render('auth/login');
        },
        postLogin(req, res, next) {
            const { email, password } = req.body;
            // Validate request
            if(!email || !password) {
                req.flash('error', 'All fields are required'); // if user does not complete the form, the flash method returns the error message in messages.error
                return res.redirect('/login');
            }

            // receives data from the bcrypt in passport.js
            passport.authenticate('local', (err, user, info)=> {
                if(err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.login(user, (err) => {
                    if(err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },
        register(req, res) {
            res.render('auth/register');
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            // Validate request
            if(!name || !email || !password) {
                req.flash('error', 'All fields are required'); // if user does not complete the form, the flash method returns the error message in messages.error
                req.flash('name', name); // this helps auto-complete the name
                req.flash('email', email); // this helps auto-complete the email
                return res.redirect('/register');
            }

            // Check if email exists
            User.exists({ email: email }, (err, result) => {
                if(result) {
                    req.flash('error', 'Email already taken');
                    req.flash('name', name); 
                    req.flash('email', email);
                    return res.redirect('/register');
                }
            });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a user
            const user = new User({
                name,
                email,
                password: hashedPassword
            });

            // Save the user in the DB
            user.save().then((user)=> {
                // Login
                return res.redirect('/'); // if successfully logged in direct user to the home page
            }).catch(err => {
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
            });
        },
        logout(req, res) {
            req.logout()
            return res.redirect('/login');
        }
    }
}

module.exports = authController;