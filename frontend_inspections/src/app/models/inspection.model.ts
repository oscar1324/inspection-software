export class Inspection {
    // Atributos
    id: number;
    type_inspection: string;
    date: string;
    availability: number;
    over_night: number;
    number_wind_turbines_generators: number;
    wind_turbine_generator_accounted: number;
    piloted_by_me: number;
    team_mate: string;
    payment_wind_turbine_generators: number;
    gross_total_income: number;
    net_total_income: number;
    wind_farm_id: number;

    constructor(data: any){
        this.id = data.id;
        this.type_inspection = data.type_inspection;
        this.date = data.date;
        this.availability = data.availability;
        this.over_night = data.over_night;
        this.number_wind_turbines_generators = data.number_wind_turbines_generators;
        this.wind_turbine_generator_accounted = data.wind_turbine_generator_accounted;
        this.piloted_by_me = data.piloted_by_me;
        this.team_mate = data.team_mate;
        this.payment_wind_turbine_generators = data.payment_wind_turbine_generators;
        this.gross_total_income = data.gross_total_income;
        this.net_total_income = data.net_total_income;
        this.wind_farm_id = data.wind_farm_id;

    }

    getPilotedByMeTotal(): number {
        return this.piloted_by_me;
    }
}