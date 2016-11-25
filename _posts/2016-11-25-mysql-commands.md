---
layout: post
title: Mysql commands
tags: [mysql]
summary: There are some of the commands of mysql we often use
image:
  feature: mysql-2016-11-25.jpg
---

## Connection

* Connect to mysql, choose database_name and run the sql
<!--lang: bash-->
```
mysql -u <username> -p <password> <database_name> < <local_sql_file_path>/testdb.sql
```

* Import
  - Connect to mysql
  - Run the following command
    <!--lang: bash-->
    ```
    source <local_sql_file_path>/testdb.sql
    ```

## Databse


* Change active database

  <!--lang: bash-->
  ```
  use <database_name>
  ```

* Show all of the databases

  <!--lang: bash-->
  ```
  show databases;
  ```



## Tables
* Show all of the tables belong to the current database
  <!--lang: bash-->
  ```
  show tables;
  ```

* Create table

  <!--lang: bash-->
  ```
  create table <table_name> (<field_name> <field_type> , <field_name2> <field_type2>, ...);
  ```

* Drop table
  <!--lang: bash-->
  ```
  drop table <table_name>
  ```

* Change table name
  <!--lang: bash -->
  ```
  alter table table_name rename to new_table_name;
  ```


* Empty table
  <!--lang: bash -->
  ```
  truncate table <table_name>
  ```

## Records
* Insert item
  <!--lang: bash-->
  ```
   Insert into <table_name> [(<field_name1> , field_name2> , ….)] values (field_value1> , field_value2> , …..);
  ```

* Select items
  <!--lang: bash-->
  ```
  select * from <table_name>;
  ```

* Update item
  <!--lang: bash-->
  ```
  Update table_name set <field_name1>='<field_value1>' [, <field_name2>='<field_value2>' , …..][where <field_name3>='<field_value3>'] [order by <field_name> <desc|asc>]
  ```

* Delete items
  <!--lang: bash-->
  ```
  delete from <table_name>  [where <field_name3>='<field_value3>'];
  ```
  _If there is no where expression, it stands for delete all of the items belongs to the table_

## Fields

* Create fields
  <!--lang: bash-->
  ```
  alter table <table_name> add column <field_name> <field_type> after <field_name>；
  ```

* Delete fields
  <!--lang: bash-->
  ```
  alter table <table_name> drop <field_name>;
  ```

* Change field
  <!--lang: bash-->
  ```
  alter table <table_name> change <old_field_name> <new_field_name> <new_field_type>;
  ```
