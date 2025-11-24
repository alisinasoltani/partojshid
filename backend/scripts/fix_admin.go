// fix_admin_hash.go
package main

import (
	"log"

	"github.com/alisinasoltani/partojshid/config"
	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/pkg/argon2"
	_ "github.com/go-sql-driver/mysql"
	
)

func main() {
	config.Load()
	db := database.Get()

	// DELETE broken admin
	db.Exec("DELETE FROM users WHERE username = 'admin'")

	// Create with CORRECT hash using YOUR code
	hash, err := argon2.Hash("Admin123!")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec(`
		INSERT INTO users (username, email, password_hash, full_name, role)
		VALUES ('admin', 'admin@local.test', ?, 'Administrator', 'admin')`, hash)
	if err != nil {
		log.Fatal("Insert failed:", err)
	}

	log.Println("Fixed admin created with correct Argon2id hash")
	log.Println("Username: admin")
	log.Println("Password: Admin123!")
}