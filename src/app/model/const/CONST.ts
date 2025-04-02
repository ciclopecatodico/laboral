export const CONST = {

    jornadaLaboralDiurna:
    {
        id: 'jornadaLaboralDiurna',
        label: 'Inicio Laboral Diurna'
    },
    jornadaLaboralNocturna:
    {
        id: 'jornadaLaboralNocturna',
        label: 'Inicio Laboral Nocturna'
    },
    jornadaDiurnaInicio:
    {
        id: 'jornadaDiurnaInicio',
        label: 'Inicio Jornada Diurna'
    },
    jornadaDiurnaFin:
    {
        id: 'jornadaDiurnaFin',
        label: 'Fin Jornada Diurna'
    },
    jornadaNocturnaInicio:
    {
        id: 'jornadaNocturnaInicio',
        label: 'Inicio Jornada Nocturna'
    },
    jornadaNocturnaFin:
    {
        id: 'jornadaNocturnaFin',
        label: 'Fin Jornada Nocturna'
    },
    senaLectiva: {
        id: 'lectiva',
        label: 'SENA Etapa Lectiva'
    },
    senaProductiva: {
        id: 'productiva',
        label: 'SENA Etapa Productiva'
    },
    jornadaLaboralDiaria:
    {
        id: 'jornadaLaboralDiaria',
        label: 'Jornada Laboral Diaria'
    },
    jornadaLaboralSemanal:
    {
        id: 'jornadaLaboralSemanal',
        label: 'Jornada Laboral Semanal'
    },
    jornadaLaboralMensual:
    {
        id: 'jornadaLaboralMensual',
        label: 'Jornada Laboral Mensual'
    },
    horasDiurnas:
    {
        id: 'horasDiurnas',
        label: 'Horas Diurnas',
    },
    horasNocturnas:
    {
        id: 'horasNocturnas',
        label: 'Horas Nocturnas'
    },
    horasPonderadas:
    {
        id: 'horasPonderadas',
        label: 'Total Horas Ponderadas por Reforma'
    },
    horasDiurnasDominicalesOFestivos:
    {
        id: 'horasDiurnasDominicalesOFestivos',
        label: 'Horas Diurnas Dominicales o Festivos'
    },
    horasNocturnasDominicalesFestivos:
    {
        id: 'horasNocturnasDominicalesFestivos',
        label: 'Horas Nocturnas Dominicales o Festivos'
    },
    horasExtrasDiurnas:
    {
        id: 'horasExtrasDiurnas',
        label: 'Horas Extras Diurnas'
    },
    horasExtrasNocturnas:
    {
        id: 'horasExtrasNocturnas',
        label: 'Horas Extras Nocturnas'
    },
    horasExtrasDiurnasDominicalesOFestivos:
    {
        id: 'horasExtrasDiurnasDominicalesOFestivos',
        label: 'Horas Extras Diurnas Dominicales o Festivos'
    },
    horasExtrasNocturnasDominicalesOFestivos:
    {
        id: 'horasExtrasNocturnasDominicalesOFestivos',
        label: 'Horas Extras Nocturnas Dominicales o Festivos'
    },
    smlv: {
        id: 'smlv',
        label: 'Salario Mínimo Legal Vigente'
    },
    smlvHora: {
        id: 'smlvHora',
        label: 'Salario Mínimo Legal Vigente por Hora'
    },
    tipoDeHoras:
    {
        id: 'tipoDeHoras',
        label: "Tipos de Horas",
        categorias: ["Diurnas", "Nocturnas", "Extra Diurnas", "Extra Nocturnas"]
    },
    tipoDeHorasPonderados:
    {
        id: 'tipoDeHorasPonderados',
        label: "Valor a pagar por tipos de horas ponderados por Reforma",
        categorias: ["Diurnas", "Nocturnas", "Extra Diurnas", "Extra Nocturnas"]
    },
    diasSemanaLaboralName: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
    diasSemanaName: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
    diasSemanaLabel: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    diaDomingo: ['domingo'],
    diasMes: 30,
    mediaNoche: '24:00',
    turnoNombrePrefix: 'Turno',
    turnoInicio: '14:00',
    turnoFin: '22:00',
    turnoHoras: '8:00',
    total: {
        id: 'total',
        label: 'Total'
    },
    agnoActual: 2025,
    mujer: {
        sexo: 'mujer',
        label: 'Mujer',
        edadPension: 57
    },
    hombre: {
        sexo: 'hombre',
        label: 'Hombre',
        edadPension: 62
    },
    reformas: [0, 1, 2, 3],
    reforma1950: {         //estos valores deben coincidir con assets/json/parametros.json !!!
        index: 0,
        reforma: '1950',
        style: 'primary'
    },
    reforma789: {
        index: 1,
        reforma: '789',
        style: 'secondary'
    },
    reforma2101: {
        index: 2,
        reforma: '2101',
        style: 'info'
    },
    reforma2025: {
        index: 3,
        reforma: '2025',
        style: 'success'
    },
    graficos: {
        label: {
            background: '#322513'
        }
    }
}
