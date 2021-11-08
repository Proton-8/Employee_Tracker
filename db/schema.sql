-- main schemas
-- removes the DB is exists and creates a new one
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
-- use this new DB
USE employee_tracker_db;
-- remove the  table and recreates it again with ID and dept
DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept VARCHAR (30)
  );
-- remove the  table and recreates it again with ID, title, salary and department_id
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
  ON DELETE SET NULL
 );
-- remove the  table and recreates it again with ID, first name, last name, roles_id and manager id
 DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  roles_id INT,
  manager_id INT,
  FOREIGN KEY (roles_id) REFERENCES roles(id)
  ON DELETE SET NULL
 );