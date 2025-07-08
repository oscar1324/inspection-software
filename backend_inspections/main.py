from app.db_connection import connect_to_db
from fastapi import FastAPI
from app.http_request import execute_insert_daily_inspection, get_all_inspection, execute_insert_windFarm
from app.models.modelInspectionDTO import Inspection
from app.models.modelWindFarmDTO import WindFarm
from fastapi.middleware.cors import CORSMiddleware



# The function returns all information of the table inspection
def execute_select_of_all():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM inspections ORDER BY date ;")

    rows = cursor.fetchall()
    for indice in rows:
        print(indice)

    cursor.close()
    conn.close()

# The function returns the information the row filtered by the the wind farm name
def execute_find_by_wind_farm(conn, wind_farm_name):
    cursor = conn.cursor()
    query = "SELECT * FROM inspections where wind_farm =  %s"
    cursor.execute(query, (wind_farm_name,))

    row = cursor.fetchone()
    print(row)

    cursor.close()
    conn.close()

# The function returns the information of the row filtered by the date
def execute_find_by_date(conn, date):
    cursor = conn.cursor()
    query = "SELECT * FROM inspections where date = %s"
    cursor.execute(query, (date,))

    row = cursor.fetchone()
    print(row)

    cursor.close()
    conn.close()

conn = connect_to_db()

# The function returns all information order by net_total_income desc
def execute_find_all_order_by_desc(conn):
    cursor = conn.cursor()
    cursor.execute("SELECT date, net_total_income FROM inspections ORDER BY net_total_income DESC")

    rows = cursor.fetchall()
    for indice in rows:
        fecha = indice[0]
        total_neto = indice[1]
        print(f"Fecha: {fecha} | Ingreso neto extra ({total_neto} €) + nómina diaria (65 €) -> {total_neto + 65} €")

    cursor.close()
    conn.close()

# The function return the total count of the net_total_income whitour speficic months
## TODO to develop: In the future I´ll make changes in the query fot to can insert a free date----------
def execute_find_total_net_income(conn):
    cursor = conn.cursor()
    query = "SELECT sum(net_total_income) FROM inspections"

    cursor.execute(query)

    row = cursor.fetchone()

    if row and row[0] is not None:
        total = row[0]
        print(f"El ingreso extra total de esta campaña es de {total:.2f} €")
    else:
        print("No hay datos disponibles")

    cursor.close()
    conn.close()
    



# The function deletes the record with the id selected
def execute_delete_by_id(conn):
    cursor = conn.cursor()
    idDelete = input('¿Qué registro quieres borrar con ID...?')
    

    try:
        
        query = "DELETE FROM inspections where id = %s"
        cursor.execute(query, (idDelete,))
        conn.commit()
        print(f"The register with id {idDelete} has just been deleted")
    except Exception as e:
        print(f"The register cannot be deleted -> {e}")
    finally:
        cursor.close()
        conn.close()
    
## TODO to develop the update function (podra cambiar todos los datos, y se envian todos, si estan igual no se toca)

# The function return all information of table inspection and send all data to the Frontend   



#execute_select_of_all()
    #execute_find_by_wind_farm(conn, "PE São Cristóvão ")
    #execute_find_by_date(conn, "2025-05-21 ")
    #execute_find_all_order_by_desc(conn)

    #execute_find_total_net_income(conn)
    #execute_insert_daily_inspection(conn)
    #execute_delete_by_id(conn)
    

app = FastAPI()

# Define the allowed origins
origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/inspections")
def read_inspections():
    return get_all_inspection()

@app.post("/add_inspections")
def create_new_register(data: Inspection):
    execute_insert_daily_inspection(data)
    return {"message": "Registro insertado correctamente"}

@app.post("/add_windFarm")
def create_new_windFarm(data: WindFarm):
    execute_insert_windFarm(data)
    return {"message": "Nuevo parque eólico creado"}

    


    



