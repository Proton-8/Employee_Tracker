-- starting code...

DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR (30),
  PRIMARY KEY (id)
 );

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id INT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
    -- ON DELETE SET NULL
 );

 DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (roles_id) REFERENCES roles(id)
   -- needed????   ON DELETE SET NULL
 );