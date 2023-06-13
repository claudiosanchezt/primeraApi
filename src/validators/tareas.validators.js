const {check, validationResult} = require('express-validator');
const {httpError}  = requiere('./..utils/error');

const validadorTarea = [
    check('titutlo')
    .exists().withMessage("Favor debe ingresar el atributo Titutlo.")
    .notEmpty().withMessage("Favor este campo debe venir con informacion."),
    check('descripcion')
    .exists().withMessage("Favor debe ingresar una Descipcion.")
    .notEmpty().withMessage("Favor este campo debe venir con informacion."),
    check('fecha_termino')
    .exists().withMessage("Favor debe ingresar el atributo fecha_termino.")
    .notEmpty().withMessage("Favor este campo debe venir con informacion."),
    check('categoria')
    .exists().withMessage("Favor debe ingresar el atributo categoria.")
    .notEmpty().withMessage("Favor este campo debe venir con informacion."),
    check('activo')
    .exists().withMessage("Favor debe ingresar el atributo Titutlo.")
    .notEmpty().withMessage("Favor este campo debe venir con informacion.")
    .isInt({min:0, max:1}).withMessage("Favor colocar 1 si es verdadero y 0 si es falso."),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            return httpError(res, error.array());
        }
    }
];

module.exports = {
    validadorTarea   
}