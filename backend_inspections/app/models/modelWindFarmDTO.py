from pydantic import BaseModel 

class WindFarm(BaseModel):

    name: str
    location: str
    province: str
    country: str
    client: str
    total_aagg: int
    type_blade: str