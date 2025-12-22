// config/config.go
package config

import (
	"log"
	"os"
	"strconv"
	"sync"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv      string
	Port        string

	DBHost      string
	DBPort      int
	DBUser      string
	DBPassword  string
	DBName      string
	DBSSLMode   string

	JWTSecret       string
	JWTExpiryHours  int

	Argon2Memory      uint32
	Argon2Iterations  uint32
	Argon2Parallelism uint8
	Argon2KeyLength   uint32
	Argon2SaltLength  uint32

	UploadPath       string
	MaxUploadSizeMB  int64
}

var (
	once     sync.Once
	instance *Config
)

func Load() *Config {
	once.Do(func() {
		// Load .env file if exists (ignored in production if not present)
		_ = godotenv.Load()

		cfg := &Config{
			AppEnv:          getEnv("APP_ENV", "development"),
			Port:             getEnv("PORT", "8080"),

			DBHost:          getEnv("DB_HOST", "remote-fanhab.runflare.com:31762"),
			DBUser:          getEnv("DB_USER", "root"),
			DBPassword:      getEnv("DB_PASSWORD", "asn7NCUnkYJcTeG4zk4h"),
			DBName:          getEnv("DB_NAME", "server3dbgo_db"),
			DBSSLMode:       getEnv("DB_SSL_MODE", "disable"),

			JWTSecret:       getEnv("JWT_SECRET", ""),
			UploadPath:      getEnv("UPLOAD_PATH", "./uploads/projects"),
			MaxUploadSizeMB: getEnvAsInt64("MAX_UPLOAD_SIZE_MB", 10),
		}

		// Required env vars – panic early if missing
		if cfg.JWTSecret == "" || cfg.JWTSecret == "change_me_to_a_very_long_random_string_at_least_32_chars" {
			log.Fatal("JWT_SECRET is required and must be set to a strong secret")
		}

		// Parse integers with defaults
		cfg.DBPort = int(getEnvAsInt64("DB_PORT", 3306))
		cfg.JWTExpiryHours = int(getEnvAsInt64("JWT_EXPIRY_HOURS", 24))

		// Argon2 – strong defaults if not set
		cfg.Argon2Memory = uint32(getEnvAsInt64("ARGON2_MEMORY", 19456))
		cfg.Argon2Iterations = uint32(getEnvAsInt64("ARGON2_ITERATIONS", 2))
		cfg.Argon2Parallelism = uint8(getEnvAsInt64("ARGON2_PARALLELISM", 1))
		cfg.Argon2KeyLength = uint32(getEnvAsInt64("ARGON2_KEY_LENGTH", 32))
		cfg.Argon2SaltLength = uint32(getEnvAsInt64("ARGON2_SALT_LENGTH", 32))

		instance = cfg
	})

	return instance
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func getEnvAsInt64(key string, fallback int64) int64 {
	if value := os.Getenv(key); value != "" {
		if i, err := strconv.ParseInt(value, 10, 64); err == nil {
			return i
		}
	}
	return fallback
}