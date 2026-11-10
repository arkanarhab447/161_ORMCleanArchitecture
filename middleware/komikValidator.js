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

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

function validateBody(Schema) {
    return (req, res, next) => {
        const { error, value } = Schema.validate(req.body, {
            abortEarly: false,
            convert: true,
            allowUnknown: false
        });

        if (error) {
            return errorResponse
            res,
            "Validasi Input Gagal",
            400,
            error.details.map((item) => ({
                field: item.path.join('.'),
                message: item.message
            }))
        );
        }req.body = value;
        next();
    };
}


function validateParams(Schema) {
    return (req, res, next) => {
        const { error, value } = Schema.validate(req.params);

        if (error) {
            return errorResponse(
                res,
                "Parameter tidak valid",
                400,
                error.details.map((item) => ({
                    field: item.path.join('.'),
                    message: item.message
                }))
            );
        }
        req.params = value;
        next();
    };
}        

module.exports = {
    validateBody: validateBody(komikSchema),
    validateParams: validateParams(idSchema)
}
