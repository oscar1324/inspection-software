# pydantic allows the automatic validation and serialize the datas
from pydantic import BaseModel 
from datetime import date

class Inspection(BaseModel):
    id: int
    type_inspection: str
    date: date
    availability: int
    over_night: int
    number_wind_turbines_generators: int
    wind_turbine_generator_accounted: int
    piloted_by_me: int
    team_mate: str
    payment_wind_turbine_generators: float
    gross_total_income: float
    net_total_income: float
    wind_farm_id: int
    comment: str
    photovoltaic_plant_id: int