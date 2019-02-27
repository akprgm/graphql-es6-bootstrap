import Joi from 'joi';

export default {
  /**
   * login validation
   */
  login: Joi.object().keys({
    email: Joi.string().max(255).required(),
    password: Joi.string().min(6).required(),
  }),

  /**
   * register validation
   */
  register: Joi.object().keys({
    name: Joi.string().trim().max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).required(),
  }),

  /**
   * password reset validation
   */
  passwordReset: Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
};
