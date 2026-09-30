CREATE DATABASE productos_db;
GO

USE productos_db;
GO

CREATE TABLE productos (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(100) NOT NULL,
  descripcion NVARCHAR(MAX) NULL,
  precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  creado_en DATETIME DEFAULT GETDATE()
);