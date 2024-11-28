const bcrypt = require("bcrypt");
const User = require("../models/usersModel");

exports.register = async (req,res) => {
    const {firstName, lastName, email, phone, dateOfBirth, gender, password} = req.body;

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const password_hash = await bcrypt.hash(password, 10);
        const newUser = await User.create(firstName,lastName,email,phone,dateOfBirth,gender,password_hash);

        res.status(201).json({
            message: 'User registered successfully',
            user: {id: newUser.id,
            name: `${firstName} ${lastName}`,
            email
            }
        });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
}

exports.login = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findByEmail(email);

        if(!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.userId = user.id;
        req.session.userRole = 'user';

        res.json({
            message: "Logged in successfully",
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                name: `${user.first_name} ${user.last_name}`
            }
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
}

exports.logout = (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: 'Error logging out'
            });
        }
        res.json({message: "Logged out successfully"})
    })
}

exports.getProfile = async(req,res) => {
    try {
        const user = await User.findById(req.session.userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            id: user.id.User,
            name: user.name.User,
            email: user.email
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
}

exports.updateProfile = async (req, res) => {
    const { name } = req.body;
    
    try {
      const updatedUser = await User.update(req.session.userId, { name });
      
      res.json({ 
        message: 'Profile updated successfully',
        user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email }
      });
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  };