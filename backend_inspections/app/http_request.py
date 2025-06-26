from fastapi import FastAPI
from app.db_connection import connect_to_db
from app.models.modelInspectionDTO import Inspection

# Objects
app = FastAPI()

# Functions

# ENDPOINT: GET/inspections

def get_all_inspection():
    conn = connect_to_db()
    cursor = conn.cursor()
    query = "SELECT * FROM inspections ORDER BY date ASC"
    
    cursor.execute(query)
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    results = []
    for indice in rows:
        
        results.append({
            "id": indice[0],
            "type_inspection": indice[1],
            "wind_farm": indice[2],
            "location": indice[3],
            "province": indice[4],
            "country": indice[5],
            "date": indice[6],
            "availability": indice[7],
            "over_night": indice[8],
            "number_wind_turbines_generators": indice[9],
            "wind_turbine_generator_accounted": indice[10],
            "piloted_by_me": indice[11],
            "team_mate": indice[12],
            "payment_wind_turbine_generators": float(indice[13]),
            "gross_total_income": float(indice[14]),
            "net_total_income": float(indice[15]),
        })


    return results


# The function insert a daily information, in the future this funtion will recieve more parametres
## TODO to develop: To add a validation -> if in this date, there exits a record: 'There is a record on this date'
def execute_insert_daily_inspection(inspections: Inspection):
    conn = connect_to_db()
    cursor = conn.cursor()


    query = """
            INSERT INTO inspections (
                type_inspection, wind_farm, location, province, country, date,
                availability, over_night, number_wind_turbines_generators,
                wind_turbine_generator_accounted, piloted_by_me, team_mate,
                payment_wind_turbine_generators, gross_total_income, net_total_income
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
    values = (
        inspections.type_inspection,
        inspections.wind_farm,
        inspections.location,
        inspections.province,
        inspections.country,
        inspections.date,
        inspections.availability,
        inspections.over_night,
        inspections.number_wind_turbines_generators,
        inspections.wind_turbine_generator_accounted,
        inspections.piloted_by_me,
        inspections.team_mate,
        inspections.payment_wind_turbine_generators,
        inspections.gross_total_income,
        inspections.net_total_income, 
    )

    try:
        cursor.execute(query,values)
        conn.commit()
        print("Query has just been registered in the database")
        
    except Exception as e:
        print(f"Query can´t be register in the database: Error -> {e}")
    finally:
        cursor.close()
        conn.close()
