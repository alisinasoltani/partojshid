package argon2

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"

	"github.com/alisinasoltani/partojshid/config"
	"golang.org/x/crypto/argon2"
)

type Params struct {
	Memory      uint32
	Iterations  uint32
	Parallelism uint8
	SaltLength  uint32
	KeyLength   uint32
}

func getParams() Params {
	cfg := config.Load()
	return Params{
		Memory:      cfg.Argon2Memory,
		Iterations:  cfg.Argon2Iterations,
		Parallelism: uint8(cfg.Argon2Parallelism),
		SaltLength:  cfg.Argon2SaltLength,
		KeyLength:   cfg.Argon2KeyLength,
	}
}

// Hash creates an Argon2id hash with random salt and returns "$argon2id$v=19$..." format
func Hash(password string) (string, error) {
	p := getParams()

	salt := make([]byte, p.SaltLength)
	if _, err := rand.Read(salt); err != nil {
		return "", fmt.Errorf("failed to generate salt: %w", err)
	}

	hash := argon2.IDKey([]byte(password), salt, p.Iterations, p.Memory, p.Parallelism, p.KeyLength)

	// Encode to standard modular crypt format (same as most tools expect)
	encoded := fmt.Sprintf("$argon2id$v=19$m=%d,t=%d,p=%d$%s$%s",
		p.Memory,
		p.Iterations,
		p.Parallelism,
		base64.RawStdEncoding.EncodeToString(salt),
		base64.RawStdEncoding.EncodeToString(hash),
	)

	return encoded, nil
}

// Verify compares a password against an Argon2id hash in standard format
func Verify(password, encodedHash string) (bool, error) {
	if err := validateFormat(encodedHash); err != nil {
		return false, err
	}

	p := getParams()
	salt, hash, err := decodeHash(encodedHash)
	if err != nil {
		return false, err
	}

	computed := argon2.IDKey([]byte(password), salt, p.Iterations, p.Memory, p.Parallelism, p.KeyLength)

	return string(computed) == string(hash), nil
}

// validateFormat does basic format checking
func validateFormat(encoded string) error {
	if len(encoded) == 0 || encoded[0] != '$' {
		return fmt.Errorf("invalid argon2 hash format")
	}
	return nil
}

// decodeHash extracts salt and hash from standard Argon2 string
func decodeHash(encoded string) ([]byte, []byte, error) {
	parts := [5]string{}
	n, err := fmt.Sscanf(encoded, "$argon2id$v=19$m=%d,t=%d,p=%d$%s$%s",
		&parts[0], &parts[1], &parts[2], &parts[3], &parts[4])
	if err != nil || n != 5 {
		return nil, nil, fmt.Errorf("failed to parse argon2 hash")
	}

	salt, err := base64.RawStdEncoding.DecodeString(parts[3])
	if err != nil {
		return nil, nil, err
	}
	hash, err := base64.RawStdEncoding.DecodeString(parts[4])
	if err != nil {
		return nil, nil, err
	}

	return salt, hash, nil
}

// Optional: Log params at startup for audit
func init() {
	p := getParams()
	log.Printf("Argon2id initialized: m=%d KiB, t=%d, p=%d, salt=%d, key=%d",
		p.Memory, p.Iterations, p.Parallelism, p.SaltLength, p.KeyLength)
}