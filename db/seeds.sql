
-- insert data into department table

       INSERT INTO department (dept)
VALUES ("Engineering"),
       ("Sales"),
       ("Marketing"),
        ("Finance"),
        ("Production");


-- insert data into roles table

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineering Manager", 200000.00, 1),
       ("Sales Manager", 180000.00, 2),
       ("Software Engineer", 100000.00, 1),
       ("Senior Software Engineer", 150000.00, 1),
       ("Sales Associate", 80000.00, 2),
       ("Marketing Manager", 300000.00, 3),
       ("Marketing Associate", 250000.00, 3),
       ("Payroll Associate", 50000, 4),
       ("Prodction Worker", 60000, 5);


-- insert data into employee table
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Ronald", "Reagan", 1, NULL ),
       ("Peanut", "Butter", 2, 1 ), 
       ("Peas" , "Canned", 4, NULL ),
       ("Donald", "Duck", 5, 4 ),
       ("Max", "Million", 6, 1);


