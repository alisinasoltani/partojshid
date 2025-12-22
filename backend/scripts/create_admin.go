// create_admin.go
package main

import (
	"log"

	"github.com/alisinasoltani/partojshid/config"
	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/model"
	"github.com/alisinasoltani/partojshid/internal/pkg/argon2"
	_ "github.com/go-sql-driver/mysql"
)

func createAdmin() {
	config.Load()
	db := database.Get()

	username := "pouyadn"
	password := "partopjs1382"

	hash, err := argon2.Hash(password)
	if err != nil {
		log.Fatal("Hash error:", err)
	}

	user := model.User{
		Username:     username,
		Email:        "p1381217@gmail.com",
		PasswordHash: hash,
		FullName:     "Super Admin",
		Role:         "admin",
	}

	_, err = db.NamedExec(`
		INSERT INTO users (username, email, password_hash, full_name, role)
		VALUES (:username, :email, :password_hash, :full_name, :role)`, &user)
	if err != nil {
		log.Fatal("Failed to create admin:", err)
	}

	log.Println("Admin created successfully!")
	log.Println("Username: ", username)
	log.Println("Password: ", password)
	log.Println("Now login with: POST /api/auth/login")
}

// func main() {
// 	createAdmin()
// }