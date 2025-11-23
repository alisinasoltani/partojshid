-- =============================================
-- Jeyshid API – Initial schema (exact copy from your document)
-- =============================================

CREATE DATABASE IF NOT EXISTS jeyshid CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;
USE jeyshid;

DROP TABLE IF EXISTS project_images;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

CREATE TABLE projects (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    
    slug                VARCHAR(100) NOT NULL UNIQUE,
    full_name           VARCHAR(255) NOT NULL DEFAULT '',
    description         TEXT,
    
    -- Persian display text
    started_at          VARCHAR(100) DEFAULT '',
    ended_at            VARCHAR(100) DEFAULT '',
    
    -- Jalali machine-readable
    started_at_jalali   VARCHAR(20)  DEFAULT NULL,      -- e.g., 1401/11
    ended_at_jalali     VARCHAR(20)  DEFAULT NULL,
    
    employer            VARCHAR(255) DEFAULT '',
    is_visible          TINYINT(1) DEFAULT 1,
    display_order       INT DEFAULT 999,

    -- Who created/owns this project entry
    created_by          ENUM('jeyshid', 'lodge') NOT NULL DEFAULT 'jeyshid',
    
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    
) ENGINE=InnoDB 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_persian_ci;

CREATE TABLE project_images (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    project_id      INT NOT NULL,
    image_path      VARCHAR(512) NOT NULL,
    alt_text        VARCHAR(255) DEFAULT NULL,
    sort_order      INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_image (project_id, image_path),

    CONSTRAINT fk_images_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;

CREATE TABLE users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    
    username        VARCHAR(50) NOT NULL UNIQUE,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    
    full_name       VARCHAR(100) DEFAULT '',
    role            ENUM('admin', 'editor') NOT NULL DEFAULT 'editor',
    
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at   TIMESTAMP NULL DEFAULT NULL,
    failed_attempts INT DEFAULT 0,
    locked_until    TIMESTAMP NULL DEFAULT NULL

) ENGINE=InnoDB 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_persian_ci;