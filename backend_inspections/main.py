from db_connection import connect_to_db


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
    


# The function insert a daily information, in the future this funtion will recieve more parametres
## TODO to develop: To add a validation -> if in this date, there exits a record: 'There is a record on this date'
def execute_insert_daily_inspection(conn):

    cursor = conn.cursor()
    query= "INSERT INTO inspections (type_inspection, wind_farm,location, province,country, date, availability, over_nigth, number_wind_turbines_generators, wind_turbine_generator_accounted, piloted_by_me, team_mate, payment_wind_turbine_generators, gross_total_income, net_total_income) values ('Inspección eólica', 'PE Prueba ','Prueba','Prueba','Prueba','2000-01-01',0,0,0,0,0,'Alejandro',0.00,0.00,0.00)"


    try:
        cursor.execute(query)
        conn.commit()
        print("Query has just been registered in the database")
        
    except Exception as e:
        print(f"Query can´t be register in the database: Error -> {e}")
    finally:
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
    
## TODO to develop the update function

    

if conn:
    #execute_select_of_all()
    #execute_find_by_wind_farm(conn, "PE São Cristóvão ")
    #execute_find_by_date(conn, "2025-05-21 ")
    #execute_find_all_order_by_desc(conn)

    #execute_find_total_net_income(conn)
    #execute_insert_daily_inspection(conn)
    execute_delete_by_id(conn)
    



