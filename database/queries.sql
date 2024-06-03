DROP TABLE IF EXISTS GASTOS;
DROP TABLE IF EXISTS ROOMMATES;

CREATE TABLE roommates (
    id UUID PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE gastos (
    gasto_id UUID PRIMARY KEY,
    roommate_id UUID NOT NULL,
	roommate_nombre VARCHAR(255) NOT NULL,
    gasto_name VARCHAR(255) NOT NULL,
    monto INT NOT NULL,
    FOREIGN KEY (roommate_id) REFERENCES roommates(id)
);

SELECT * FROM ROOMMATES;
SELECT * FROM GASTOS;

-- No se entregan seeders ya que los registros de roommates se generan usando la randomuser api 