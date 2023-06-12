const fs = require('fs/promises');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const handleSignUp = () => {
    return {
        index(req, res) {
            res.render('signUp', { userName: '', email: '', password: '', errors: 'none' });
        },
        async postSignUp(req, res, next) {
            const user = req.body;
            const {userName, email, password} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Return the validation errors
                return res.render('signUp', { userName: userName, email: email, password: password, errors: errors.array()[0].msg });
            }

            try {
                const data = await fs.readFile('user.json', 'utf8');
            
                const usersArray = JSON.parse(data).users;  
                user.id = Date.now();

                user.password = await bcrypt.hash(password)
                usersArray.push(user);
                
                // Convert the JavaScript object back to a JSON string
                const jsonString = '{"users":' + JSON.stringify(usersArray) +'}';
                
                // Write the JSON string back to the file
                await fs.writeFile('user.json', jsonString, 'utf8');
                    
                console.log('user added successfully.');
                return res.redirect('/auth/login');
            } catch (error) {
                const err = new Error(error);
                err.httpStatusCode = 500;
                next(err);
            }
        },
    }
}
const handleLogin = () => {
    return {
        index(req, res) {
            res.render('login');
        },
        async postLogin(req, res, next) {
            const {email, password} = req.body;
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Return the validation errors
                console.log(errors.array());
                return res.render('login', { email: email, password: password, errors: errors.array()[0].msg });
            }

            try {
                const data = await fs.readFile('user.json', 'utf8');
        
                // Parse the JSON string into a JavaScript objectE
                const usersArray = JSON.parse(data).users;
                
                const index = usersArray.findIndex( user => user.email === email);

                // check email exist in Database
                if(index === -1) {
                    console.log(`User does not exist with email: ${email}`);
                    return res.render('login',  { email: email, password: password, errors: errors.array()[0].msg });
                }

                const hashedUserPassword = usersArray[index].password
                // check password
                const result = await bcrypt.compare(password, hashedUserPassword);
                if(!result) {
                    console.log('Please provide correct password', { email: email, password: password, errors: errors.array()[0].msg });
                    return res.render('login');
                }

                req.session.isAuthenticated = true;
                req.session.user = usersArray[index];
                return res.redirect('/user/profile');
            } catch (error) {
                const err = new Error(error);
                err.httpStatusCode = 500;
                next(err);
            }
        }            
    }
}
const handleLogout = (req, res, next) => {
    req.session.destroy(err => {
        if(err) {
            const err = new Error(err);
            err.httpStatusCode = 500;
            next(err);
        }

        return res.redirect('/auth/login');
    });
}
module.exports = {handleLogin, handleSignUp, handleLogout};
