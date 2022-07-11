import joi from "joi";

export const activateSchema = joi.object({
  cardId: joi.number().min(1).required(),
  securityCode: joi.string().pattern(new RegExp("[0-9]")).min(3).max(3).required(),
  password: joi.string().pattern(new RegExp("[0-9]")).min(4).max(4).required(),
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
  });
