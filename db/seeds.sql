
-- insert data into department table
INSERT INTO department (id, name)
VALUES (001, "Engineering"),
       (002, "Sales"),
       (003, "Purchasing"),
       (004, "Finance"),
       (005, "Production");

-- insert data into roles table
INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Software Engineer", 100000, 001),
       (002, "peanut butter", "staples", " "), 
       (003, "peas-canned", "canned goods", " "),
       (004, "ice cream", "frozen", " "),
       (005, "potato chips", "snacks", " ");


-- insert data into employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Ron", "Reagan", 1, 1),
       (002, "Peanut", "Butter", 2, NULL ), 
       (003, "Peas" , "Canned", 4, NULL),
       (004, "ice cream", "frozen", " "),
       (005, "potato chips", "snacks", " ");