export const UserValidationSchema = {
    firstname: {
        notEmpty: {
            Errormessage: "firstname cannot empty"
        }
    },
    lastname: {
        notEmpty: true
    }
}