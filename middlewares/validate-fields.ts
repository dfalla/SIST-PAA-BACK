import { isDni } from "../helpers";
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
    check("last_name", "Ingrese un apellido válido")
        .trim()
        .notEmpty(),
    check("mother_last_name", "Ingrese un apellido válido")
        .trim()
        .notEmpty(),
    check("dni", "Ingrese un número de DNI válido")
        .trim()
        .notEmpty()
        .custom(isDni)
        .isLength({min:8, max:8}),
        validateFields,
];
