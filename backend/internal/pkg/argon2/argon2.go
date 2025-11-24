// internal/pkg/argon2/argon2.go
package argon2

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"strings"

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

func Hash(password string) (string, error) {
	p := getParams()

	salt := make([]byte, p.SaltLength)
	if _, err := rand.Read(salt); err != nil {
		return "", err
	}

	hash := argon2.IDKey([]byte(password), salt, p.Iterations, p.Memory, p.Parallelism, p.KeyLength)

	encoded := fmt.Sprintf("$argon2id$v=19$m=%d,t=%d,p=%d$%s$%s",
		p.Memory, p.Iterations, p.Parallelism,
		base64.RawStdEncoding.EncodeToString(salt),
		base64.RawStdEncoding.EncodeToString(hash))

	return encoded, nil
}

// FIXED Verify — uses strings.Split instead of buggy Sscanf
func Verify(password, encodedHash string) (bool, error) {
	parts := strings.Split(encodedHash, "$")
	if len(parts) != 6 {
		return false, fmt.Errorf("invalid hash format")
	}

	if parts[1] != "argon2id" || parts[2] != "v=19" {
		return false, fmt.Errorf("unsupported algorithm/version")
	}

	var m uint32
	var t uint32
	var p uint8

	_, err := fmt.Sscanf(parts[3], "m=%d,t=%d,p=%d", &m, &t, &p)
	if err != nil {
		return false, err
	}

	salt, err := base64.RawStdEncoding.DecodeString(parts[4])
	if err != nil {
		return false, err
	}

	hash, err := base64.RawStdEncoding.DecodeString(parts[5])
	if err != nil {
		return false, err
	}

	computed := argon2.IDKey([]byte(password), salt, t, m, p, uint32(len(hash)))
	return string(computed) == string(hash), nil
}

func init() {
	p := getParams()
	log.Printf("Argon2id initialized: m=%d KiB, t=%d, p=%d, salt=%d, key=%d",
		p.Memory, p.Iterations, p.Parallelism, p.SaltLength, p.KeyLength)
}