
# Proyecto FunerariaDigital

El proyecto FunerariaDigital, es un proyecto desarrollado por estudiantes de la universidad de caldas, en acompañamiento del profesor Felipe Buitrago Carmona, y como objetivo principal afianzar y aplicar conocimientos presentados en la clase de programación III.

## Requisitos

- Instalar Node (versión estable): https://nodejs.org/es/ 
- Instalar MySql: https://dev.mysql.com/downloads/workbench/ 
- https://www.mongodb.com/es/atlas

## Instalación ms-negocio 

1. Clona este repositorio mediante adonis:
    ``` shell
    git clone https://github.com/Molton321/Funeraria-Digital.git
    ```
2. Navega hasta el directorio del proyecto Negocio.
    ```shell
    cd ./Funeraria-Digital/ms-negocio
    ```
3. Instale las dependencias del proyecto
    ```shell
    npm install
    ```
4. Configura las variables de .env en base a .env.example

5. Ejecuta el proyecto:
    ``` shell
    npm run dev
    ```

## Instalación ms-security

1. Clona este repositorio mediante adonis:
    ``` shell
    git clone https://github.com/Molton321/Funeraria-Digital.git
    ```
2. Navega hasta el directorio del proyecto Negocio.
    ```shell
    cd ./Funeraria-Digital/ms-security
    ```
3. Configure el JDK 17

4. Configura las variables de .env 
    ```
    server.port=8181
    spring.data.mongodb.uri=    mongodb://Link de la base de datos Mongo a almacenar la informacion
    spring.data.mongodb.database=nombre de la base de datos
    
    jwt.secret=TuClaveSecreta
    jwt.expiration=3600000
    ```

5. Ejecuta el archibo ".\src\main\resources\application.properties":

## Instalación ms-notifications 

1. Clona este repositorio mediante adonis:
    ``` shell
    git clone https://github.com/Molton321/Funeraria-Digital.git
    ```
2. Navega hasta el directorio del proyecto Negocio.
    ```shell
    cd ./Funeraria-Digital/ms-notifications
    ```
3. Configure el Virtual Environment con python
    ```
    python.exe -m venv . 
    ```
4. Configura las variables de .env 
    ```
    CONNECTION_STRING = Conection String del microservicio de Azure
    ```

5. Ejecuta el Archivo "./main.py":
   

