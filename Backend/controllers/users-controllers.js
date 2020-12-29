const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const getAllUsers = async(req,res,next) =>{
  
  let user;
  try {
    user = await User.find({});
   }
   catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find all users.',
      500
    );
    return next(error);
}
if (!user) {
  const error = new HttpError(
    'Could not find a user for the provided id.',
    404
  );
  return next(error);
}
res.json({user});
};


const getUserById = async (req, res, next ) =>{
    const userId = req.params.uid;
   
    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a user.',
        500
      );
      return next(error);
  }
  if (!user) {
    const error = new HttpError(
      'Could not find a user for the provided id.',
      404
    );
    return next(error);
  }
  res.json({ user: user.toObject({ getters: true }) });
   };

 const createUser = async (req, res, next) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email , password } = req.body;

    const createdUser = new User({
        name,
        email, 
        password
      });

      try {
       
        await createdUser.save(); 
       
      } catch (err) {
        const error = new HttpError(
          'Creating user failed, please try again.',
          500
        );
        return next(error);
      }

      res.status(201).json({user: createdUser})

};

const updateUser =  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    
      throw new HttpError('Invalid inputs passed, please check your data.', 422)
  }
    
    const { name, email , password } = req.body;
    const userId = req.params.uid;

    let user;
    try {
    user = await User.findById(userId);
    } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    );
    return next(error);
  }
    user.name = name;
    user.email = email;
    user.password = password;


    try {
      await user.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update user.',
        500
      );
      return next(error);
    }

    res.status(200).json({user : user.toObject({ getters: true }) });


};

const deleteUser = async (req, res, next) => {

    const userId = req.params.uid;   
    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete user.',
        500
      );
      return next(error);
    }
  
    try {
      await user.remove();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete user.',
        500
      );
      return next(error);
    }
    res.status(200).json({ message: 'Deleted user.' });
};

 exports.getUserById = getUserById;
 exports.createUser = createUser;
 exports.updateUser = updateUser;
 exports.deleteUser = deleteUser;
 exports.getAllUsers = getAllUsers;