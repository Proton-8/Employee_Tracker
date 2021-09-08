
-- insert data into department table
INSERT INTO department (id, name)
VALUES (001, "produce"),
       (002, "staples"),
       (003, "canned goods"),
       (004, "frozen"),
       (005, "snacks");

-- insert data into roles table
INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "spinach", "produce", " "),
       (002, "peanut butter", "staples", " "), 
       (003, "peas-canned", "canned goods", " "),
       (004, "ice cream", "frozen", " "),
       (005, "potato chips", "snacks", " ");


-- insert data into employee table
INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (001, "spinach", "produce", " "),
       (002, "peanut butter", "staples", " "), 
       (003, "peas-canned", "canned goods", " "),
       (004, "ice cream", "frozen", " "),
       (005, "potato chips", "snacks", " ");