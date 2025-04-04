
export class BarrasSimpleDatos {

  constructor(
    public chartLabel:string,
    public dataLabel: string,
    public colors: string[],
    public data: number[],
    public categories: string[] | string[][],
    public labelColor: string[],
    public prefix: string,
    public sufix: string,
    public factor: number,
    public decimales: number,
    public separador: string,
  ) { }

};