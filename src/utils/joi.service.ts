import Joi from 'joi';

export async function validateRequestBody(
  requestBody: any,
  joiValidationSchema: Joi.ObjectSchema<any>,
): Promise<
  | {
      isError: boolean;
      error: string;
      data: never[];
      statusCode: number;
    }
  | undefined
> {
  const {error, value} = joiValidationSchema.validate(requestBody, {
    abortEarly: false,
  });
  let errorMessage: string = '';
  if (error && Object.keys(error).length) {
    errorMessage = error.details.map(detail => detail.message).join(', ');
  }
  if (!errorMessage.length) {
    return;
  }
  return {
    isError: true,
    error: `Bad Request ${errorMessage}`,
    data: [],
    statusCode: 400,
  };
}
