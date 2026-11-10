const Joi = require('joi');

function errorResponse(res, message, status, details = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: details,
    });
}

const komikSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().trim().allow(null, '').optional(),
    author: Joi.string().min(1).max(100).required()
});