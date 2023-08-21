import { customDate, isDniOrCarnet } from "../helpers";
import { validateFields, check} from "./validationResult";

export const validateFieldsLogin = 
[
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 caracteres como mínimo').isLength({min:6}),
    validateFields
];

export const validateFieldsRegister = 
[   //middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),

    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de 6 caracteres como mínimo').isLength({min: 6}),
    // check('password', 'El password debe de ser de 15 caracteres como máximo').isLength({max: 15}),
    validateFields
];

export const validationFieldsStudent = [
    check("name", "Ingrese un nombre válido")
        .isString()
        .trim()
        .notEmpty(),
    check("age", "Ingrese una edad válida")
        .isInt({min: 3, max: 90}).withMessage('La edad debe estar entre 3 y 90')
        .isNumeric()
        .trim()
        .notEmpty(),
    check("last_name", "Ingrese un apellido válido")
        .trim()
        .notEmpty(),
    check("mother_last_name", "Ingrese un apellido válido")
        .trim()
        .notEmpty(),
    check("address", "Ingrese un dirección válida")
        .isString()
        .trim(),
    check("type_document", "Debes seleccionar una opción válida.")
        .notEmpty(),
    check("document_number", "Ingrese un número de documento válido")
        .trim()
        .notEmpty()
        .custom(isDniOrCarnet),
    check("phone_number", "Ingrese un número de teléfono válido")
        .isLength({ min: 9, max: 9 })
        .notEmpty()
        .matches(/^\d+$/),
    check("level", "Debes seleccionar una opción válida.")
        .notEmpty(),
    check("amount_payable", "El monto debe ser máximo S/.80")
        .isInt({max: 80})
        .isNumeric()
        .trim()
        .notEmpty(),
    check("category", "Debes seleccionar una opción válida.")
        .notEmpty(),
    check("date_admission", "El valor debe ser una fecha válida.")
        .notEmpty()
        .custom(customDate),
    validateFields,
];
