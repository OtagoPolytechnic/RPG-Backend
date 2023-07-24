/*
 * This file contains the registration and login routes for the user authentication.
 * It uses bcryptjs for password hashing, jwt for token generation and validation,
 * and Joi for input validation.
 */

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Registers a new user with the provided information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with success message and user data.
 */
const register = async (req, res) => {
  try {
    let { firstName, lastName, email, password, confirmPassword, profilePicture, username, role } =
      req.body;

    // Define the Joi schema for input validation
    const userSchema = Joi.object({
      firstName: Joi.string().min(2).max(50).required().messages({
        'string.min': 'First name must have a minimum length of 2 characters',
        'string.max': 'First name must have a maximum length of 50 characters',
      }),
      lastName: Joi.string().min(2).max(50).required().messages({
        'string.min': 'Last name must have a minimum length of 2 characters',
        'string.max': 'Last name must have a maximum length of 50 characters',
      }),
      username: Joi.string().min(5).max(10).alphanum().required().messages({
        'string.alphanum': 'Username must contain only alphanumeric characters',
        'string.min': 'Username must have a minimum length of 5 characters',
        'string.max': 'Username must have a maximum length of 10 characters',
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .pattern(new RegExp(`^${username}@\\w+\\.\\w+$`))
        .required()
        .messages({
          'string.email': 'Email address must be valid',
          'any.required': 'Email address is required',
        }),
      password: Joi.string()
        .min(8)
        .max(16)
        .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
        .required()
        .messages({
          'string.min': 'Password must have a minimum length of 8 characters',
          'string.max': 'Password must have a maximum length of 16 characters',
          'string.pattern.base':
            'Password must contain at least one numeric character and one special character',
        }),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match the password',
        'any.required': 'Confirm password is required',
      }),
    });

    // Validate the input data against the schema
    const { error, value } = userSchema.validate({
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    });

    if (error) {
      // Validation failed, return an error response
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if a user with the same email or username already exists
    let user = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (user) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    /**
     * A salt is random bits added to a password before it is hashed. Salts
     * create unique passwords even if two users have the same passwords
     */
    const salt = await bcryptjs.genSalt();

    profilePicture = `https://api.dicebear.com/6.x/pixel-art/svg?seed=${username}`;

    /**
     * Generate a hash for a given string. The first argument
     * is a string to be hashed, i.e., Pazzw0rd123 and the second
     * argument is a salt, i.e., E1F53135E559C253
     */
    const hashedPassword = await bcryptjs.hash(password, salt);

    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        profilePicture,
        password: hashedPassword,
        role,
      },
    });

    /**
     * Delete the password property from the user object. It
     * is a less expensive operation than querying the User
     * table to get only user's email and name
     */
    delete user.password;

    return res.status(201).json({
      msg: 'User successfully registered',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

/**
 * Logs in a user with the provided email/username and password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with success message and JWT token.
 */
const login = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Find a user with the provided email or username
    let user = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or username' });
    }

    /**
     * Compare the given string, i.e., Pazzw0rd123, with the given
     * hash, i.e., user's hashed password
     */
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    // Get the JWT secret and lifetime from environment variables
    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    /**
     * Return a JWT. The first argument is the payload, i.e., an object containing
     * the authenticated user's id and name, the second argument is the secret
     * or public/private key, and the third argument is the lifetime of the JWT
     */
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );

    return res.status(200).json({
      msg: `${user.username} successfully logged in`,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { register, login };
