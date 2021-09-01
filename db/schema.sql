-- starting code...

DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) 
 );

DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id INT,
  title VARCHAR(30),
  salary DECIMAL,
 FOREIGN KEY (deparment_id) REFERENCES department(id)
    -- ON DELETE SET NULL
 );

 DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
 FOREIGN KEY (role_id) REFERENCES role(id)
   -- needed????   ON DELETE SET NULL
 );