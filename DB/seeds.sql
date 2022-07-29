USE employees_db;

INSERT INTO department(name) VALUES
("Administration"),
("Finance"),
("Human Resources"),
("Marketing");

INSERT INTO roles(role_position, salary, department_id) VALUES
("Front End Engineer", 80000, 1),
("Back End Engineer", 95000, 2),
("Full Stack Engineer", 110000, 3),
("DevOps Engineer", 120000, 4),

INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES
("Jane", "Doe", 1, null),
("John", "Doe", 2, null),
("James", "Smith", 3, 1),
("Maria", "Garcia", 3, 2),
("Jane", "Doe", 1, null),
("Patricia", "Lane", 2, null),
("Adam", "Wayne", 4, null),