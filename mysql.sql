drop database if exists employee_tracker;
create database employee_tracker;
use employee_tracker;

create table department(
 id int primary key auto_increment,
 name_dept varchar(30) not null);
 
 insert into department(name_dept)
 values("Foods"), ("Sports"), ("Health"), ("Fashions");
 
 select * from department;
 
 create table roles(
 id int primary key auto_increment,
 title varchar(30) not null,
 salary decimal (10,2) not null,
 department_id int);
 
 insert into roles(title, salary, department_id)
 values("Cook", 80000, 1), ("Director of Sports", 120000, 2), ("Nurse", 55000, 3), ("Public Relations", 100000, 4);
 
 select * from roles;
 
 
 create table employees(
 id int primary key auto_increment,
 first_name varchar(30) not null,
 last_name varchar(30) not null,
 role_id int not null);

 
 insert into employees(first_name, last_name, role_id)
 values("Tom", "Jerry", 1), ("Bill", "Belichick", 2), ("Tom","Brady", 3), ("Kevin", "Ferg", 4);
 
 select * from employees;
 