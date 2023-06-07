export default (data) =>{
    let errors = {}
    if (!data.email){
        errors.e1 = 'Ingrese Email'
    }
    if (!data.email.includes('@')){
        errors.e2 = 'Email Invalido!'
    }
    if (!data.email.includes('.')){
        errors.e3 = 'Email Invalido!'
    }
    if (!/\d/.test(data.password)){
        errors.p1 = 'Debe tener al menos debe tener un numero'
    }
    if (data.password.length < 6 || data.password.length > 15){
        errors.p2 = 'Debe tener entre 6 y 15 caracteres'
    }
    return errors;
}