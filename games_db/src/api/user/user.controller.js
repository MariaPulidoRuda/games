const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./user.model');
const { setError } = require('../../helpers/error/handle.error');

const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    console.log(newUser);
    const userDuplicate = await User.findOne({
      userName: newUser.userName,
    });
    console.log(userDuplicate);
    if (userDuplicate) return next('User already exists');

    const newUserDB = newUser.save();
    return res.json({
      status: 201,
      message: 'User registered',
      data: newUserDB,
    });
  } catch (error) {
    return next(setError(500, 'User registered fail'));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ username: req.body.username });
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          username: userInfo.username,
          role: userInfo.role,
        },
        req.app.get('secretKey'),
        { expiresIn: '200h' },
      );
      return res.json({
        status: 200,
        message: 'Welcome Back',
        user: userInfo,
        token: token,
      });
    } else {
      return next('Incorrect password');
    }
  } catch (error) {
    return next(setError(500, 'User login fail'));
  }
};
const patchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = new User(req.body);
    patient._id = id;
    const updateUser = await User.findByIdAndUpdate(id, user);
    return res.status(200).json(updateUser);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerUser, loginUser, patchUser, deleteUser };
