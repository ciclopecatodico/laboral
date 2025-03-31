
## SIMULADOR REFORMA LABORAL

Este proyecto es una herramienta para calcular los cambios que percibirán los trabajadores con las diferentes reformas laborales. 



## Fuentes

Reforma laboral Uribe: 
https://razonpublica.com/horas-extras-y-jornada-nocturna-vale-la-pena-volver-al-sistema-de-antes/




## PARÁMETROS : 

Detalle de todos los parámetros a tener en cuenta en los cálculos del simulador


### Ley 50 de 1990 

#### Fuente: 

Recargos para la Ley 50 de 1990: 
https://accounter.co/normatividad/conceptos/liquidacion-salarial-por-concepto-de-recargos-nocturnos.html

Articulo 24 Trabajo diurno y nocturno y extra:

Artículo 29 Domingo y Festivos: 

1. El trabajo en domingo o días de fiesta se remunera con un recargo del ciento por ciento (100%) sobre el salario ordinario en proporción a las horas laboradas, sin prejuicio del salario ordinario a que tenga derecho el trabajador por haber laborado la semana completa 

A partir de este texto interpreto que el Domingo o Festivo recibe recargo del 100%

#### Valores: 

| Parámetro      | Valor      |
| ------------- | ------------- |
| Jornada Diurna Inicio | 06:00 AM |
| Jornada Diurna Fin| 06:00 PM |
| Jornada Nocturna Inicio | 06:00 PM |
| Jornada Nocturna Fin| 06:00 AM |
| Jornada Diaria | 08 Horas |
| Jornada Diaria | 48 Horas |
| Hora Diurna | 0% |
| Hora Nocturna | 35% |
| Hora Diurna Dominicales O Festivos | 75% |
| Hora Nocturna Dominicales O Festivos | ??? |
| Hora Extra Diurno | 25% |
| Hora Extra Nocturno | 75% |
| Hora Extra Diurna Dominical o Festivos | ??? |
| Hora Extra Nocturna Dominical o Festivos | ??? |





### Ley 789 de 2002

| Parámetro      | Valor      |
| ------------- | ------------- |
| Jornada Diurna Inicio | 06:00 AM |
| Jornada Diurna Fin| 10:00 PM |
| Jornada Nocturna Inicio | 10:00 PM |
| Jornada Nocturna Fin| 06:00 AM |
| Jornada Diaria | 08 Horas |
| Jornada Diaria | 48 Horas |
| Hora Diurna | 0% |
| Hora Nocturna | 35% |
| Hora Diurna Dominicales O Festivos | 75% |
| Hora Nocturna Dominicales O Festivos | 110% |
| Hora Extra Diurno | 25% |
| Hora Extra Nocturno | 75% |
| Hora Extra Diurna Dominical o Festivos | 100% |
| Hora Extra Nocturna Dominical o Festivos | 150% |

### Reforma Laboral Petro



## Preguntas? 

Cuando se liquida un día que tiene, por ejemplo jornadas:   
Parámetros: 
    Horas Jornada Dia: 8h
    Jornada Diurna ['06:00 AM - 06:00 PM']
    Jornada Nocturna ['06:00 PM - 06:00 AM']


Horario del día: ['12:00 AM - 10:00 AM', '10:00 PM - 11:59 PM']


Entonces tendríamos 
6 horasNocturnas de ['12:00 AM - 06:00 AM']
2 horasDiurnas  de ['06:00 AM - 08:00 AM']
2 horasExtrasDiurnas  de ['08:00 AM - 10:00 AM']
2 horasExtrasNocturnas  de ['10:00 PM - 11:59 PM']

para un total de 12 horas 


Se debe aplicar un criterio de continuidad en el paso de la noche a la madrugada cuando la persona trabaja más de 8 horas en el cambio de un día a otro 


Tengo una duda respecto a la jornada laboral, al disminuir la jornada laboral mensual a 230 horas no da 46 horas semanales o 7.6 diarias, 
es decir que las horas extra empezarían a contar a partir de las 7.6 horas para 2025? 


Cómo se liquidaban 

