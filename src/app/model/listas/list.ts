import { Item } from "../item/item";

export class List {

    constructor(){}

       public horas_24 : Item[] = [
        {
            id:'0',
            label:'0:00'
        },
        {
            id:'1',
            label:'1:00'
        },
        {
            id:'2',
            label:'2:00'
        },
        {
            id:'3',
            label:'3:00'
        },
        {
            id:'4',
            label:'4:00'
        },
        {
            id:'5',
            label:'5:00'
        },
        {
            id:'6',
            label:'6:00'
        },
        {
            id:'7',
            label:'7:00'
        },
        {
            id:'8',
            label:'8:00'
        },
        {
            id:'9',
            label:'9:00'
        },
        {
            id:'10',
            label:'10:00'
        },
        {
            id:'11',
            label:'11:00'
        },
        {
            id:'12',
            label:'12:00'
        },
        {
            id:'13',
            label:'13:00'
        },
        {
            id:'14',
            label:'14:00'
        },
        {
            id:'15',
            label:'15:00'
        },
        {
            id:'16',
            label:'16:00'
        },
        {
            id:'17',
            label:'17:00'
        },
        {
            id:'18',
            label:'18:00'
        },
        {
            id:'19',
            label:'19:00'
        },
        {
            id:'20',
            label:'20:00'
        },
        {
            id:'21',
            label:'21:00'
        },
        {
            id:'22',
            label:'22:00'
        },
        {
            id:'23',
            label:'23:00'
        }
    ];

    public horas_12 : Item[] = [
        {
            id:'1',
            label:'01'
        },
        {
            id:'2',
            label:'02'
        },
        {
            id:'3',
            label:'03'
        },
        {
            id:'4',
            label:'04'
        },
        {
            id:'5',
            label:'05'
        },
        {
            id:'6',
            label:'06'
        },
        {
            id:'7',
            label:'07'
        },
        {
            id:'8',
            label:'08'
        },
        {
            id:'9',
            label:'09'
        },
        {
            id:'10',
            label:'10'
        },
        {
            id:'11',
            label:'11'
        },
        {
            id:'12',
            label:'12'
        }
    ];


    public minutos : Item[] = [
        {
            id:'00',
            label:'00'
        },
        {
            id:'15',
            label:'15'
        },
        {
            id:'30',
            label:'30'
        },
        {
            id:'45',
            label:'45'
        }
    ];


    public amPm : Item[] = [
        {
            id:'AM',
            label:'AM'
        },
        {
            id:'PM',
            label:'PM'
        }
    ];

    public dias : Item[] = [
        {
            id:'lunes',
            label:'Lunes'
        },
        {
            id:'martes',
            label:'Martes'
        },
        {
            id:'miercoles',
            label:'Miércoles'
        },
        {
            id:'jueves',
            label:'Jueves'
        },
        {
            id:'viernes',
            label:'Viernes'
        },
        {
            id:'sabado',
            label:'Sábado'
        },
        {
            id:'domingo',
            label:'Domingo'
        }
    ];

    public configuracion : Item[] = [
        {
            id:'jornadaDiurnaInicio',
            label:'Inicio Jornada Diurna'
        },
        {
            id:'jornadaDiurnaFin',
            label:'Fin Jornada Diurna'
        },
        {
            id:'jornadaNocturnaInicio',
            label:'Inicio Jornada Nocturna'
        },
        {
            id:'jornadaNocturnaFin',
            label:'Fin Jornada Nocturna'
        },
        {
            id:'jornadaLaboralDiaria',
            label:'Jornada Laboral Diaria'
        },
        {
            id:'jornadaLaboralSemanal',
            label:'Jornada Laboral Semanal'
        }, 
        {
            id:'horasDiurnas',
            label:'Horas Diurnas'
        },
        {
            id:'horasNocturnas',
            label:'Horas Nocturnas'
        }, 
        {
            id:'horasDiurnaDominicalesOFestivos',
            label:'Horas Diurnas Dominicales o Festivos'
        },
        {
            id:'horasNocturnasDominicalesFestivos',
            label:'Horas Nocturnas Dominicales o Festivos'
        },
        {
            id:'horasExtrasDiurnas',
            label:'Horas Extras Diurnas'
        },
        {
            id:'horasExtrasNocturnas',
            label:'Horas Extras Nocturnas'
        },
        {
            id:'horasExtrasDiurnasDominicalesOFestivos',
            label:'Horas Extras Diurnas Dominicales o Festivos'
        },
        {
            id:'horasExtrasNocturnasDominicalesOFestivos',
            label:'Horas Extras Nocturnas Dominicales o Festivos'
        }
    ];
}
