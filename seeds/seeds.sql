USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 110000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 115000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 1200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brianna", "Rene", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leon", "King", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kate", "Miller", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Walter", "Jones", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Bryant", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Guy", "Hoop", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Brown", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Daisy", "Martin", 1, null);