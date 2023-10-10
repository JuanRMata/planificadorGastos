export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric', //Aqui especificamos que el año va a se numerico
        month: 'long', //Aqui especificamos que queremos el nombre completo del mes ej.Abril
        day: '2-digit' //Aqui especificamos con cuantos digitos queremos manejar los dias en este caso 2
    }

    return fechaNueva.toLocaleDateString('es-ES',opciones)
}

export const formatearCantidad = (cantidad) => { // Funcion para formatear la cantidad y aparezca en formato de dolares (dinero)
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    return formatter.format(cantidad)
}