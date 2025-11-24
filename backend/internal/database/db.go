package database

import (
	"fmt"
	"log"
	"sync"

	"github.com/alisinasoltani/partojshid/config"
	"github.com/jmoiron/sqlx"
)

var (
	once sync.Once
	db   *sqlx.DB
)

func Get() *sqlx.DB {
	once.Do(func() {
		cfg := config.Load()

		dsn := fmt.Sprintf(
			"%s:%s@tcp(%s:%d)/%s?parseTime=true&multiStatements=true&charset=utf8mb4",
			cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBName,
		)

		log.Printf("DB DSN: %s:%s@tcp(%s:%d)/%s", cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBName)

		var err error
		db, err = sqlx.Open("mysql", dsn)
		if err != nil {
			log.Fatalf("Failed to open database: %v", err)
		}

		db.SetMaxOpenConns(25)
		db.SetMaxIdleConns(25)
		db.SetConnMaxLifetime(5 * 60 * 1_000_000_000) // 5 minutes

		if err = db.Ping(); err != nil {
			log.Fatalf("Failed to ping database: %v", err)
		}

		log.Println("Database connection established")
	})

	return db
}