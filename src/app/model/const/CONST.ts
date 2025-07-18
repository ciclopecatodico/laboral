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
    maximoHorasExtra:
    {
        id: 'maximoHorasExtra',
        label: 'Máximo de Horas Extra Semanales'
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
    descansoRemunerado: {
        id: 'descansoRemunerado',
        label: ' Descanso Remunerado'
    },
    festivo: {
        id: 'festivo',
        label: ' Festivo'
    },
    festivoRemunerado: {
        id: 'festivoRemunerado',
        label: ' Remunerado'
    },
    smlv: {
        id: 'smlv',
        label: 'Salario Mínimo Legal Vigente'
    },
    smlvHora: {
        id: 'smlvHora',
        label: 'Salario Mínimo Legal Vigente por Hora'
    },
    salario: {
        id: 'salario',
        label: 'Salario Mensual Simulación'
    },
    salarioHora: {
        id: 'salarioHora',
        label: 'Salario por Hora Simulación'
    },
    agnoInicio: {
        label: 'Año inicio aplicación reforma',
    },
    tipoDeHoras:
    {
        id: 'tipoDeHoras',
        label: 'Tipos de Horas',
        categorias: ['Diurnas', 'Nocturnas', 'Extra Diurnas', 'Extra Nocturnas'],
        colores: ['var(--HDiur)', 'var(--HNoct)', 'var(--HDiuExt)', 'var(--HNoctExt)']
    },
    tipoDeHorasMenorAJornada:
    {
        id: 'tipoDeHorasMenorAJornada',
        label: 'Sin registrar',
        categorias: ['Diurnas', 'Nocturnas', 'Extra Diurnas', 'Extra Nocturnas', 'Sin Registrar'],
        colores: ['var(--HDiur)', 'var(--HNoct)', 'var(--HDiuExt)', 'var(--HNoctExt)', 'var(--HNoRegist)']
    },
    tipoDeHorasPonderados:
    {
        id: 'tipoDeHorasPonderados',
        label: 'Valor a pagar por tipos de horas ponderados por Reforma',
        categorias: ['Diurnas', 'Nocturnas', 'Extra Diurnas', 'Extra Nocturnas'],
        colores: ['#26a69a', '#008ffb', '#00E396', '#546E7A']
    },
    diagramas: {
        mes: {
            barrasSimple: {
                id: 'ingresoMensualPorTipoDeReforma',
                label: 'Ingreso mensual según tipo de reforma',
                yLabel: 'Salario Mensual'
            }
        },
        meses: {
            barrasSimple: {
                id: 'ingresoAnualPorTipoDeReforma',
                label: 'Ingreso anual según tipo de reforma',
                yLabel: 'Salario anual'
            }
        },
        agnos: {
            barrasSimple: {
                id: 'ingresoLaboralPorTipoDeReforma',
                label: 'Ingreso total según tipo de reforma',
                yLabel: 'Ingresos percibidos'
            }
        }
    },
    formularioErrorMsg: {
        mes: {
            senaEtapa: 'Debe seleccionar una etapa del SENA',
            senaDuracion: 'Se requiere duración de la práctica',
            salario: 'El salario debe ser mayor o igual al SMLV',
            salarioIntegral: 'La simulación no está diseñada para salarios integrales o superiores pero podrías considerar hacer una donación!'
        },
        agno: {
            edad: 'Edad debe ser mayor a 18',
            experiencia: 'Experiencia debe ser mayor a 0',
            sexo: 'Debe seleccionar una modalidad de pensión',
            edadPension: 'La edad debe ser menor a la edad de Pensión',
        }
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
    turnoHoras: '08:00',
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
    reformas: [0, 1, 2, 3, 4],
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
    reforma1846: {
        index: 2,
        reforma: '1846',
        style: 'info'
    },
    reforma2101: {
        index: 3,
        reforma: '2101',
        style: 'warning'
    },
    reforma2025: {
        index: 4,
        reforma: '2025',
        style: 'success'
    },
    yAxisMin: 0.0, //punto donde inician las graficas 
    contarHorasSinRegistrar: false,
    salarioCongresista: 48142046,
    congresistasFolder: 'publico/congresistas/',
    congresistasTime: 2000
}
