

USE employees_db

INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("developer", 70000, 1);  

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(4, "John", "Smith", 2, null)
(4, "John", "Smith", 2, null)