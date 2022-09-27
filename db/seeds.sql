USE employeeTracker_DB;

INSERT INTO department (name)
VALUES (1, "Sales");
INSERT INTO department (name)
VALUES (2, "Engineering");
INSERT INTO department (name)
VALUES (3, "Finance");
INSERT INTO department (name)
VALUES (4, "Legal");

INSERT INTO role (title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES (2, "Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES (3 ,"Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES (4, "Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES (5, "Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Drew", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rriguez", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Smith", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jamy", "Sun", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Star", "Loud", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Allen", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Eckenrode", 1, 2);
