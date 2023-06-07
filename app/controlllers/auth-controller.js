const fs = require('fs');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const handleSignUp = () => {
    return {
        index(req, res) {
            res.render('signUp', { userName: '', email: '', password: '', errors: 'none' });
        },
        postSignUp(req, res) {
            const user = req.body;
            const {userName, email, password} = req.body;

            if(!userName || !email || !password) {
                console.log('all fields required');
                return res.render('signUp', { userName: userName, email: email, password: password, errors: '' });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Return the validation errors
                console.log(errors.array());
                return res.render('signUp', { userName: userName, email: email, password: password, errors: errors.array()[0].msg });
            }

            fs.readFile('user.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading JSON file:', err);
                    return res.end();
                }
            
                try {
                    const usersArray = JSON.parse(data).users;  
                    user.id = Date.now();
                    bcrypt.hash(password, 10).then( hash => {
                        user.password = hash;
                        usersArray.push(user);
                
                        // Convert the JavaScript object back to a JSON string
                        const jsonString = '{"users":' + JSON.stringify(usersArray) +'}';
                
                        // Write the JSON string back to the file
                        fs.writeFile('user.json', jsonString, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing to JSON file:', err);
                                return res.end();
                            }
                    
                            console.log('user added successfully.');
                            res.status(201);
                            return res.redirect('/');
                        });
                    });
                } catch (err) {
                    console.error('Error parsing JSON:', err);
                }
            });
        },
    }
}
const handleLogin = () => {
    return {
        index(req, res) {
            res.render('login');
        },
        postLogin(req, res) {
           const {email, password} = req.body;
            console.log('email', email);
            console.log('password', password);
           if(!email || !password) {
                console.log('all fields are required');
                return res.render('login');
           }
           fs.readFile('user.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return res.render('login');
            }
        
            try {
                // Parse the JSON string into a JavaScript objectE
                const usersArray = JSON.parse(data).users;
                
                const index = usersArray.findIndex( user => user.email === email);

                // check email exist in Database
                if(index === -1) {
                    console.log(`User does not exist with email: ${email}`);
                    return res.render('login');
                }

                const hashedUserPassword = usersArray[index].password
                // check password
                bcrypt.compare(password, hashedUserPassword).then(result => {
                    if(!result) {
                        console.log('Please provide correct password');
                        return res.render('login');
                    }

                    req.session.isAuthenticated = true;
                    req.session.user = usersArray[index];
                    console.log('Successfully logged In....');
                    return res.redirect('/');
                });

                } catch (err) {
                    console.error('Error parsing JSON:', err);
                    return res.render('login');
                }
            });
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
               // Return the validation errors
               console.log(errors.array());
               return res.render('login', { email: email, password: password, errors: errors.array()[0].msg });
           }
        }            
    }
}
const handleLogout = (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(400);
                console.log('Unable to logout');
                return res.redirect('/logout');
            }

            console.log('Logout successfully');
            return res.redirect('/auth/login');
        });
    }
}
module.exports = {handleLogin, handleSignUp, handleLogout};
