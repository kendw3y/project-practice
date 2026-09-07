import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
    
    const exceptionResponse = exception instanceof HttpException
    ? exception.getResponse()
    : 'Error interno del servidor'

    const message = typeof exceptionResponse === 'string'
    ?exceptionResponse
    :(exceptionResponse as any).message || 'Error desconocido'

    const errorResponse={
      success:false,
      statusCode:status,
      message,
      timestamp: new Date().toISOString()
    }

    response.status(status).json(errorResponse)
  }
}
