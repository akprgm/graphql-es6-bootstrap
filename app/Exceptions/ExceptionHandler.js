/**
 * Handler for all error exceptions
 * @param error
 * @return error object
 */
import Logger from '../Helpers/Logger';

export default function (error) {
  Logger.error(error);
  const errorName = (error.originalError) ? error.originalError.name : error.name;
  const errorMessage = (error.originalError) ? error.originalError.message : error.message;
  const method = (error.path) ? error.path[0] : '';
  switch (errorName) {
    case 'GeneralException':
      return { statusCode: 503, message: errorMessage, method };
    case 'UnauthorizedException':
      return { statusCode: 401, message: errorMessage, method };
    case 'NotFoundException':
      return { statusCode: 404, message: errorMessage, method };
    case 'ConflictException':
      return { statusCode: 409, message: errorMessage, method };
    case 'ValidationException':
      return { statusCode: 422, message: errorMessage, method };
    case 'ForbiddenException':
      return { statusCode: 403, message: errorMessage, method };
    case 'GraphQLError':
      return { statusCode: 400, message: errorMessage, method };
    default:
      return { statusCode: 501, message: 'unable to process request, please try later', method };
  }
}
