// scripts/create_first_admin.go
package main

import (
	"fmt"
	"log"
	"os"

	"github.com/alisinasoltani/partojshid/config"
	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/model"
	"github.com/alisinasoltani/partojshid/internal/pkg/argon2"
)

func main() {
	// Load config (uses .env or env vars)
	config.Load()

	// Connect to DB
	db := database.Get()

	var count int
	err := db.Get(&count, "SELECT COUNT(*) FROM users")
	if err != nil {
		log.Fatal("Failed to query users table:", err)
	}

	if count > 0 {
		fmt.Println("Users already exist. Skipping first admin creation.")
		return
	}

	// === CREATE FIRST ADMIN ===
	username := getEnv("FIRST_ADMIN_USERNAME", "admin")
	email := getEnv("FIRST_ADMIN_EMAIL", "admin@partojshid.local")
	password := getEnv("FIRST_ADMIN_PASSWORD", "ChangeMe123!")

	if password == "ChangeMe123!" {
		fmt.Println("\nWARNING: Using default password!")
		fmt.Println("   Set these environment variables to customize:")
		fmt.Println("     FIRST_ADMIN_USERNAME")
		fmt.Println("     FIRST_ADMIN_EMAIL")
		fmt.Println("     FIRST_ADMIN_PASSWORD")
		fmt.Println()
	}

	hash, err := argon2.Hash(password)
	if err != nil {
		log.Fatal("Failed to hash password:", err)
	}

	user := model.User{
		Username:     username,
		Email:        email,
		PasswordHash: hash,
		FullName:     "Administrator",
		Role:         "admin",
	}

	result, err := db.NamedExec(`
		INSERT INTO users (username, email, password_hash, full_name, role)
		VALUES (:username, :email, :password_hash, :full_name, :role)`, &user)
	if err != nil {
		log.Fatal("Failed to create first admin:", err)
	}

	id, _ := result.LastInsertId()
	fmt.Printf("First admin created successfully!\n")
	fmt.Printf("   ID       : %d\n", id)
	fmt.Printf("   Username : %s\n", username)
	fmt.Printf("   Email    : %s\n", email)
	fmt.Printf("   Role     : admin\n")
	fmt.Println("\nLogin at: http://localhost:8080")
	fmt.Println("Change the password immediately!")
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}