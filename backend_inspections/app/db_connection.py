import psycopg2
from psycopg2 import sql

# Configuración de conexión con la base de datos

DB_NAME = "WindTurbineInspection2025"
DB_USER = "postgres"
DB_PASSWORD = "root"
DB_HOST = "localhost"
DB_PORT = "7777"


def connect_to_db():
    try:
        connection = psycopg2.connect(
            dbname = DB_NAME,
            user = DB_USER,
            password = DB_PASSWORD,
            host = DB_HOST,
            port= DB_PORT
        )
        print("The database is connected!");
        return connection

    except Exception as e:
        print("Error trying connect to the database...");
        return None