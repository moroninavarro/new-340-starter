INSERT INTO "account" (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


UPDATE "account" SET account_type = 'Admin' WHERE account_id = 1;


DELETE FROM "account" WHERE account_id = 1;


UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'huge interior')
WHERE inv_id = 10;


SELECT classification_name, inventory.inv_make, inventory.inv_model  FROM "inventory" JOIN classification ON
inventory.classification_id = 2
WHERE classification_name = 'Sport';


UPDATE inventory
SET inv_image = REGEXP_REPLACE(
	inv_image,
	'(^|/)image',
	'\1image/vehicles',
	'g'
),
	inv_thumbnail = REGEXP_REPLACE(
	inv_thumbnail,
	'(^|/)image',
	'\1image/vehicles',
	'g'
)
WHERE inv_image ~ '/image' OR inv_thumbnail ~ 'image';