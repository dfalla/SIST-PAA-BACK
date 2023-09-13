# MODELADO DE BD - PAA -> (SISTEMA DE ALUMNOS, PAGOS , HORARIOS y PRÉSTAMOS)

## PAA - (Alumnos , pagos y horarios)

##### STUDENTS **(ED)**
- student_id **(PK)**
- name
- last_name
- mother_last_name
- type_document **(FK)**
- num_document
- address
- age
- date_admission
- group    **(FK)**    
- category **(FK)**
- level    **(FK)**
- image
- image_public_id
- price_per_month **(FK)**
- payment_registred **(FK)**
- times_created
- active

##### TYPES_DOCUMENTS **(EC)**
- type_document_id **(PK)**
- document_name

##### CATEGORIES **(EC)**
- category_id **(PK)**
- category_name

##### LEVELS **(EC)**
- level_id **(PK)**
- level_name

##### GROUPS **(EC)**
- group_id **(PK)**
- group_name

##### PAYMENTS_COMPLETE_PER_MONTH **(ED)**
- payment_id **(PK)**
- payment_registred **(FK)**
- complete

##### PAYMENTS_REGISTRED **(ED)**
- payment_id **(PK)**
- name_of_the_month **(FK)**
- student **(FK)**
- amount_received

##### PRICES_PER_MOUNTH **(EC)**
- price_id **(PK)**
- payment

##### MONTHS **(EC)**
- month_id **(PK)**
- month_name **(UQ)**

##### SCHEDULES **(ED)**
- schedule_id **(PK)**
- hour **(UQ)**
- monday
- tuesday
- wednesday
- thursday
- friday
- saturday

##### CLIENTS
- client_id **(PK)**
- name
- last_name
- type_doc **(FK)**
- num_document
- phone
- address
- occupation

##### LOANS **(ED)**
- loan_id
- client **(FK)**
- amount
- interest
- date_of_payment

## RELACIONES

1. One ***Student*** has a ***type_document*** (_1 to 1_)
1. One ***Student*** belongs to a ***group*** (_1 to 1_)
1. One ***Student*** belongs to a ***category*** (_1 to 1_)
1. One ***Student*** has a ***level*** (_1 to 1_)
1. One ***Student***  is related to one ***price_per_month*** per month (_1 to 1_)
1. A ***student*** can have many ***payments_registered*** per month (_1 to M_)
1. A ***payment_complete_per_month*** have many ***payments_registered***
1. A ***month*** have many ***payments_registred*** (_1 to M_)
1. One ***client*** have a ***type_doc***
1. One **client** can have many ***loans*** (_1 to M)


## LÓGICA DE NEGOCIO

### STUDENTS
1. Create student 
1. Read all students
1. Read one student
1. Update student
1. Delete student

### TYPES_DOCUMENTS
1. Create type_document 
1. Read all type_document
1. Read one type_document
1. Update type_document
1. Delete type_document

### CATEGORIES
1. Create category 
1. Read all category
1. Read one category
1. Update category
1. Delete category

### LEVELS
1. Create level 
1. Read all level
1. Read one level
1. Update level
1. Delete level

### GROUPS
1. Create group 
1. Read all group
1. Read one group
1. Update group
1. Delete group

### PAYMENTS_COMPLETE_PER_MONTH
1. Create payment_per_month 
1. Si al crear el pago por mes el alumn@ pagó completamente el mes correspondiente, el item complete debe estar en true, de lo contrario el item complete se debe colocar en false.
1. Read all payment_per_month
1. Read one payment_per_month
1. Update payment_per_month
1. Solo se podrá editar el pago por mes a los alumnos que tengan el item complete en false, se debe restar el pago que se ha registrado previamente hasta completar el monto que paga mensual y luego cambiar la opción de complete a true
1. Delete payment_per_month

### PAYMENTS_REGISTRED
1. Create payment_registred
1. La suma de todos los pagos registrados debe ser igual al precio por mes que se selecciono para el alumno
1. Read all payment_registred
1. Read one payment_registred
1. Update payment_registred
1. Delete payment_registred

### PRICES_PER_MOUNTH
1. Create price_per_month
1. Read all price_per_month
1. Read one price_per_month
1. Update price_per_month
1. Delete price_per_month

### MONTHS
1. Create month
1. Read all month
1. Read one month
1. Update month
1. Delete month

### SCHEDULES
1. Create schedule
1. Read all schedule
1. Read one schedule
1. Update schedule
1. Delete schedule

### LOANS
1. Create loan
1. Read all loan
1. Read one loan
1. Update loan
1. Delete loan

### CLIENTS
1. Create client
1. Read all client
1. Read one client
1. Update client
1. Delete client