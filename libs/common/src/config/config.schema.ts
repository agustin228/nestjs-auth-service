import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    PORT: Joi.number().default(3000).required(),
    STAGE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432).required(),
    DB_NAME: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
});
