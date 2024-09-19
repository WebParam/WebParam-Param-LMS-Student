
export interface IOption{
    chart?:any;
    tooltip?:any;
    plotOptioms?:any;
    grid?:any;
    xaxis?:any;
    fill?:any;
    labels?:any[];

}
export interface ISeries{
    data: number[];
}

export interface IChart{
    options: IOption;
    series?:ISeries[];
 
}


export const mainColor= "#eb4224";