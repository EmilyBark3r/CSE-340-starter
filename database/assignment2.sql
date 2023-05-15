
-- USE
-- 1. Insert ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n') into account.
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES 	('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2. Modify the Tony Stark record to change the account_type to "Admin".
UPDATE public.account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony';





-- 3. Delete the Tony Stark record from the database.
DELETE 
FROM public.account 
WHERE account_firstname = 'Tony';




-- 4. Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors" using REPLACE
UPDATE public.inventory
SET inv_description = REPLACE(inv_description,'the small interiors','a huge interior')
WHERE inv_make = 'GM';

-- 5. Inner Join to select the make and model fields from the inventory 
-- table and the classification name field from the 
-- classification table for inventory items that belong to the "Sport" category
SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM public.inventory 
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_id = 2;




-- 6. Update all records in the inventory table to 
-- add "/vehicles" to the middle of the file path in the 
-- inv_image and inv_thumbnail columns using a single query.
-- example: /images/vehicles/a-car-name.jpg
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

