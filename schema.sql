-- DROP DATABASE IF EXISTS employees_db;

-- CREATE DATABASE employees_db;

-- USE employees_db;


-- CREATE TABLE department (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30) 
-- );


-- CREATE TABLE role (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(20) NOT NULL,
--     salary DECIMAL NOT NULL,
--     department_id INT NOT NULL,
--     FOREIGN KEY (department_id) REFERENCES department(id) 
-- );





-- CREATE TABLE employee (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     manager_id INT,
--     role_id INT,
--     FOREIGN KEY (manager_id) REFERENCES employee(id),
--     FOREIGN KEY (role_id) REFERENCES role(id)
-- );


DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) 
);


CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
 
);


