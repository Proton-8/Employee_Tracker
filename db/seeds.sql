
-- insert data into department table

       INSERT INTO department (dept)
VALUES ("Corporate"),
       ("Engineering"),
       ("Sales"),
       ("Marketing"),
        ("Finance"),
        ("Production");


-- insert data into roles table

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineering Manager", 200000.00, 1),
       ("Sales Manager", 180000.00, 3),
       ("Software Engineer", 100000.00, 2),
       ("Senior Software Engineer", 150000.00, 2),
       ("Sales Associate", 80000.00, 3),
       ("Marketing Manager", 300000.00, 1),
       ("Marketing Associate", 250000.00, 4),
       ("Payroll Associate", 50000, 5),
       ("Prodction Worker", 60000, 6);


-- insert data into employee table
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Ronald", "Reagan", 1, NULL ),
       ("Mickey", "Mouse", 3, 1 ), 
       ("Bob" , "Evans", 4, NULL ),
       ("Donald", "Duck", 5, 3 ),
       ("Santa", "Claus", 6, Null);


