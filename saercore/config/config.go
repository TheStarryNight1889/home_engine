package config

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Load() error {
	env := os.Getenv("GO_ENV")
	if env == "" {
		env = "development"
	}

	return loadEnvFile(fmt.Sprintf(".env.%s", env))
}

func loadEnvFile(filename string) error {
	file, err := os.Open(filename)
	if err != nil {
		return fmt.Errorf("error opening env file: %w", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}

		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])

		os.Setenv(key, value)
	}

	return scanner.Err()
}
