drop database if exists employee_tracker;
create database employee_tracker;
use employee_tracker;

create table department(
 id int primary key auto_increment,
 name_dept varchar(30) not null);
 
 insert into department(name_dept)
 values("Foods", "Sports", "Health", "Fashions");
 
 create table roles(
 id int primary key auto_increment,
 title varchar(30) not null,
 salary decimal (10,2) not null,
 department_id int);
 
 
 create table employees(
 id int primary key auto_increment,
 first_name varchar(30) not null,
 last_name varchar(30) not null,
 role_id int,
 manager_id int not null);
 