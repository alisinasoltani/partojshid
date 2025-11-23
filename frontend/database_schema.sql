-- =============================================
-- Updated Projects Table with created_by (restricted)
-- =============================================

DROP TABLE IF EXISTS project_images;
DROP TABLE IF EXISTS projects;

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
    
    -- Gregorian dates for correct sorting
    started_at_date     DATE NULL,
    ended_at_date       DATE NULL,
    
    employer            VARCHAR(255) DEFAULT '',
    is_visible          TINYINT(1) DEFAULT 1,
    display_order       INT DEFAULT 999,

    -- NEW: Who created/owns this project entry
    created_by          ENUM('jeyshid', 'lodge') NOT NULL DEFAULT 'jeyshid',
    
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_slug (slug),
    INDEX idx_visible (is_visible),
    INDEX idx_order (display_order),
    INDEX idx_start_date (started_at_date),
    INDEX idx_created_by (created_by),
    INDEX idx_ongoing (ended_at_date)
) ENGINE=InnoDB 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_persian_ci;

-- Recreate images table
CREATE TABLE project_images (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    project_id      INT NOT NULL,
    image_path      VARCHAR(512) NOT NULL,
    alt_text        VARCHAR(255) DEFAULT NULL,
    sort_order      INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_image (project_id, image_path),
    INDEX idx_project_order (project_id, sort_order),

    CONSTRAINT fk_images_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;