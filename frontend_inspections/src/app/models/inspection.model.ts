export interface Inspection {
    id: number;
    type_inspection: string;
    wind_farm: string;
    location: string;
    province: string;
    country: string;
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
}