package ratelimiter

import (
	"sync"
	"time"

	"github.com/labstack/echo/v4"
	_ "github.com/labstack/gommon/log"
)

type Bucket struct {
	capacity  int64
	tokens    int64
	rate      time.Duration // time per token refill
	lastRefill time.Time
	mu        sync.Mutex
}

func newBucket(capacity int64, rate time.Duration) *Bucket {
	return &Bucket{
		capacity:  capacity,
		tokens:    capacity,
		rate:      rate,
		lastRefill: time.Now(),
	}
}

func (b *Bucket) take() bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(b.lastRefill)
	addTokens := int64(elapsed / b.rate)

	if addTokens > 0 {
		b.tokens = min(b.capacity, b.tokens+addTokens)
		b.lastRefill = now
	}

	if b.tokens > 0 {
		b.tokens--
		return true
	}
	return false
}

type Limiter struct {
	buckets sync.Map // key (string) -> *Bucket
	gcTimer *time.Ticker
	stopGC  chan struct{}
}

func New() *Limiter {
	l := &Limiter{
		gcTimer: time.NewTicker(10 * time.Minute),
		stopGC:  make(chan struct{}),
	}

	go l.gcLoop()

	return l
}

func (l *Limiter) Close() {
	l.gcTimer.Stop()
	close(l.stopGC)
}

func (l *Limiter) gcLoop() {
	for {
		select {
		case <-l.gcTimer.C:
			l.buckets.Range(func(key, value interface{}) bool {
				b := value.(*Bucket)
				b.mu.Lock()
				if time.Since(b.lastRefill) > 30*time.Minute {
					l.buckets.Delete(key)
				}
				b.mu.Unlock()
				return true
			})
		case <-l.stopGC:
			return
		}
	}
}

func (l *Limiter) Middleware(capacity int64, rate time.Duration, keyFunc func(echo.Context) string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			key := keyFunc(c)

			val, ok := l.buckets.Load(key)
			if !ok {
				val = newBucket(capacity, rate)
				l.buckets.Store(key, val)
			}

			b := val.(*Bucket)
			if !b.take() {
				return echo.NewHTTPError(429, "rate limit exceeded")
			}

			return next(c)
		}
	}
}

// Helpers
func IPKey(c echo.Context) string {
	return c.RealIP()
}

func LoginKey(username string) string {
	return "login:" + username
}

func UserKey(userID uint) string {
	return "user:" + string(userID)
}

func min(a, b int64) int64 {
	if a < b {
		return a
	}
	return b
}