const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')


module.exports = class UserController {

    static async register (req, res)  {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const user = new User({ email: req.body.email, name:req.body.name, password: hashedPassword });
          await user.save();
          res.status(201).send('User registered successfully');
        } catch (error) {
          res.status(500).send('Error registering user');
        }
      };

      // User login and generate JWT token
    static async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(401).send('Invalid password');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      res.status(500).send('Error logging in');
    }
  };
}

