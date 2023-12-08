INSERT INTO department (id, name)
VALUES
    (1, 'Sales'),
    (2, 'Engineering'),
    (3, 'Finance'),
    (4, 'Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Chandler', 'Bing', 1, NULL),
    ('Rachel', 'Green', 2, 1),
    ('Ross', 'Geller', 3, NULL),
    ('Phoebe', 'Buffay', 4, 3),
    ('Joey', 'Tribbiani', 5, NULL),
    ('Gunther', 'Coffee', 6, 5),
    ('Carol', 'Lezbo', 7, NULL),
    ('Central', 'Perk', 8, 7);