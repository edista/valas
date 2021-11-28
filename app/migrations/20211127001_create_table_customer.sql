CREATE TABLE customers(
    id INTEGER PRIMARY KEY NOT NULL,
    uuid VARCHAR(255),
    name VARCHAR(255),
    place_of_birth VARCHAR(255),
    date_of_birth VARCHAR(255),
    additional_info VARCHAR(255),
    job_id INT,
    citizenship_id INT,
    gender VARCHAR(255),
    courier_name VARCHAR(255),
    is_pep TINYINT,
    customer_type_id INT,
    notes TEXT
);

CREATE INDEX customers_uuid_idx on customers (uuid);
CREATE INDEX customers_jobs_idx on customers (job_id);
CREATE INDEX customers_citizenships_idx on customers (citizenship_id);
CREATE INDEX customers_customer_types_idx on customers (customer_type_id);
