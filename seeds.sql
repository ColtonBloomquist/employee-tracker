

USE employees_db

INSERT INTO department (name, id)
VALUES 
("Sales", 2),
("Engineering", 1),
("Finance", 3),
("Legal", 4);

INSERT INTO role (title, salary, id, department_id)
VALUES ("Developer", 70000, 1, 1),
("Marketing", 40000, 2, 2),
("Operations", 50000, 3,  3),
("Lawyer", 150000, 4, 4);  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Smith", 1, 2),
("James", "Adams", 2, null);