from fastapi import FastAPI
from app.db_connection import connect_to_db
from app.models.modelInspectionDTO import Inspection
from app.models.modelWindFarmDTO import WindFarm

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
            "date": indice[2],
            "availability": indice[3],
            "over_night": indice[4],
            "number_wind_turbines_generators": indice[5],
            "wind_turbine_generator_accounted": indice[6],
            "piloted_by_me": indice[7],
            "team_mate": indice[8],
            "payment_wind_turbine_generators": float(indice[9]),
            "gross_total_income": float(indice[10]),
            "net_total_income": float(indice[11]),
            "wind_farm_id": indice[13]
        })


    return results


# The function insert a daily information, in the future this funtion will recieve more parametres
## TODO to develop: To add a validation -> if in this date, there exits a record: 'There is a record on this date'
def execute_insert_daily_inspection(inspections: Inspection):
    conn = connect_to_db()
    cursor = conn.cursor()


    query = """
            INSERT INTO inspections (
                type_inspection, date,
                availability, over_night, number_wind_turbines_generators,
                wind_turbine_generator_accounted, piloted_by_me, team_mate,
                payment_wind_turbine_generators, gross_total_income, net_total_income, wind_farm_id
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
    values = (
        inspections.type_inspection,
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
        inspections.wind_farm_id
    )

    try:
        cursor.execute(query,values)
        conn.commit()
        print("Query has just been registered in the database")
        
    except Exception as e:
        print(f"New Register daily Inspection Query can´t be register in the database: Error -> {e}")
    finally:
        cursor.close()
        conn.close()

# This function create a new wind farm in the data base
def execute_insert_windFarm(windFarm: WindFarm):
    conn = connect_to_db()
    cursor= conn.cursor()

    query = "INSERT INTO wind_farm (name, location, province, country, client, total_aagg, type_blade) values (%s, %s, %s, %s, %s, %s, %s);"
    values = (
 
        windFarm.name,
        windFarm.location,
        windFarm.province,
        windFarm.country,
        windFarm.client,
        windFarm.total_aagg,
        windFarm.type_blade
    )
    
    try:
        cursor.execute(query, values)
        conn.commit()
        print("Query has just been registered in the database")
     
    except Exception as e:
        print(f"Register WindFarm Query can´t be register in the database: Error -> {e}")
    finally:
        cursor.close()
        conn.close()

# This function sum all Wind Farms Turbines piloted By de drone pilot
def getTotalCountWTGPiloted():
    total_piloted_by_me = 0
    print(f"EJECUCIÓN METODO ")
    conn = connect_to_db()
    cursor = conn.cursor()

    query = "SELECT * FROM public.inspections"

    try:
        cursor.execute(query)
        rows = cursor.fetchall()

        results = []
        for indice in rows:
            results.append(indice[7])
        
        total_piloted_by_me = sum(results)
        print(f"Suma total de aerogeneradores pilotados -> {total_piloted_by_me}")
        return total_piloted_by_me
       
    except Exception as e:
        print(f"It´s impossible get the total count WTG piloted data about the data base... Error -> {e}")
        return  print(f"Error en el método")
    finally:
        cursor.close()
        conn.close()

    
# This function sum all Wind Farms Turbines Inspection
def getTotalCountWTG():
    print(f"Ejecucion getTotalCountWTG")
    conn = connect_to_db()
    cursor = conn.cursor()

    Query = "SELECT number_wind_turbines_generators FROM public.inspections"

    try:
        cursor.execute(Query)
        rows = cursor.fetchall()

        results = []

        for indice in rows:
            results.append(indice[0])

        totalWTGInspections = sum(results)
        print(f"Suma total de aerogeneradores inspeccionados durante campaña 2025 -> {totalWTGInspections}")

        return totalWTGInspections
    
    except Exception as e:
         print(f"It´s impossible get the total count WTG data about the data base... Error -> {e}")
         return  print(f"Error en el método")
    finally:
        cursor.close()
        conn.close()

# ----------------------------------------------------------------------------------------------------------------

# This function get all data about windfarm table
def getAllWindFarm():
    conn = connect_to_db()
    cursor = conn.cursor()

    query = "SELECT * FROM public.wind_farm"

    try:
        cursor.execute(query)
        rows = cursor.fetchall()

        results = []
        for indice in rows:
            results.append({
                "id": indice[0],
                "name": indice[1],
                "location": indice[2],
                "province": indice[3],
                "country": indice[4],
                "client": indice[5],
                "total_aagg": indice[6],
                "type_blade": indice[7],
            })
        
        return results
    
    except Exception as e:
        print(f"Error during the ejecution getAllWindFarm -> {e}")
        return {
            "message" : "Error durante endPoint  ---> /getAll_WindFarms"
        }
    finally:
        cursor.close()
        conn.close()

    

    