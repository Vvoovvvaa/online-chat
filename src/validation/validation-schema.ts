import * as Joi from "joi";

export const validationSchema = Joi.object({
    PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_TEMP_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    ACCESKEYID: Joi.string().required(),
    SECRETACCESSKEY: Joi.string().required(),
    REGION: Joi.string().required(),
    BUCKET: Joi.string().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    GOOGLE_CALLBACK_URL: Joi.string().required(),
    FACEBOOK_CLIENT_ID: Joi.string().required(),
    FACEBOOK_CLIENT_SECRET: Joi.string().required(),
    FACEBOOK_CALLBACK_URL: Joi.string().required()

})



