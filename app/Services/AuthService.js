import Joi from 'joi';
import Hash from '../Helpers/Hash';
import Mailer from '../Helpers/Mailer';
import Validator from '../Validators/Validator';
import * as Exceptions from '../Exceptions/Exceptions';
import ClientRepository from '../Repositories/ClientRepository';

export default class AuthService {
  constructor() {
    this.clientRepo = new ClientRepository();
  }

  /**
   * login client
   * @param args object
   * @returns client object
   */
  async login(args) {
    const { error, value } = Joi.validate(args, Validator.login);

    if (error) {
      throw (new Exceptions.ValidationException(error.details[0].message));
    }

    try {
      const client = await this.clientRepo.find({ email: value.email });
      if (!client || client.get('deleted_at') !== null) {
        throw (new Exceptions.NotFoundException());
      }

      const pwdMatch = await Hash.compareHash(value.password, client.get('password'));
      if (!pwdMatch) {
        throw (new Exceptions.NotFoundException('invalid username or password'));
      }
      
      const encryptedEmail = await Hash.encrypt(client.get('email'));
      const accessToken = await Hash.generateToken({ email: encryptedEmail }, process.hope.hash.access_token_expire);
      let refreshToken = client.get('refresh_token');
      try {
        await Hash.verifyToken(refreshToken);
      } catch (error) {
        // generating new refresh token
        refreshToken = await Hash.generateToken({ email: encryptedEmail }, process.hope.hash.refresh_token_expire);
        client.set('refresh_token', refreshToken);
      }
      
      await client.save();
      client.set('access_token', accessToken);
      return client.toJSON({ visibility: false });
    } catch (error) {
      throw error;
    }
  }

  /**
   * register new client
   * @param args object
   * @returns client object
   */
  async register(args) {
    const { error, value } = Joi.validate(args, Validator.register);

    if (error) {
      throw (new Exceptions.ValidationException(error.details[0].message));
    }

    try {
      const client = await this.clientRepo.find({ email: value.email });
      if (client) {
        throw (new Exceptions.ConflictException());
      }
      const encryptedEmail = await Hash.encrypt(value.email);
      const hashedPassword = await Hash.generateHash(value.password);
      const accessToken = await Hash.generateToken({ email: encryptedEmail }, process.hope.hash.access_token_expire);
      const refreshToken = await Hash.generateToken({ email: encryptedEmail }, process.hope.hash.refresh_token_expire);
      const activationToken = await Hash.generateToken({ email: value.email });

      let newClient = await this.clientRepo.create({
        name: value.name,
        email: value.email,
        password: hashedPassword,
        refresh_token: refreshToken,
      });
      newClient = await this.clientRepo.find({ email: value.email });
      newClient.set('access_token', accessToken);
      const mailer = new Mailer();
      mailer.sendRegisterationMail(newClient.get('email'), {
        activation_url: `${process.hope.app.api_url}/views/mail-redirect.htm?url=${process.hope.app.api_url}/api/activate-account?token=${activationToken}`,
        fname: newClient.get('fname'),
        lname: newClient.get('lname'),
      });
      return newClient.toJSON({ visibility: false });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * forgot password
   * @param {*} args
   */
  async forgotPassword(args) {
    const { error, value } = Joi.validate(args, Joi.object().keys({
      email: Joi.string().email().required(),
    }));

    if (error) {
      throw (new Exceptions.ValidationException(error.details[0].message));
    }

    try {
      const token = await Hash.generateToken({ email: value.email }, process.hope.hash.token);
      const client = await this.clientRepo.find({ email: value.email });
      if (!client) {
        throw (new Exceptions.ValidationException('Email does not exist. Kindly Register'));
      }
  
      const mailer = new Mailer();
      mailer.sendForgotPasswordMail(value.email, {
        forget_url: `${process.hope.app.api_url}/views/mail-redirect.htm?url=${process.hope.app.api_url}/api/forgot-password?token=${token}`,
        name: (client) ? client.get('name') : '',
      });
      return 'A password reset mail is sent to you, please check your mailbox';
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * reset password
   * @param {*} args
   */
  async resetPassword(args) {
    const { error, value } = Joi.validate(args, Validator.passwordReset);

    if (error) {
      throw (new Exceptions.ValidationException(error.details[0].message));
    }

    const verifyToken = await Hash.verifyToken(value.token);
    if (!verifyToken) {
      throw (new Exceptions.UnauthorizedException());
    }
    const client = await this.clientRepo.find({ email: verifyToken.email });
    if (!client) {
      throw (new Exceptions.NotFoundException());
    }
    const hashedPassword = await Hash.generateHash(value.password);
    const encryptedEmail = await Hash.encrypt(client.get('email'));
    const accessToken = await Hash.generateToken({ uuid: encryptedEmail }, process.hope.hash.access_token_expire);
    client.set('password', hashedPassword);
    const updatedClient = await client.save();
    updatedClient.set('access_token', accessToken);
    return updatedClient.toJSON();
  }

  /**
   * get access token
   * @param client
   * @returns accessToken string
   */
  async accessToken(client) {
    try {
      const encryptedEmail = await Hash.encrypt(client.get('email'));
      const accessToken = await Hash.generateToken({ email: encryptedEmail }, process.hope.hash.access_token_expire);
      return accessToken;
    } catch (error) {
      throw error;
    }
  }
}
