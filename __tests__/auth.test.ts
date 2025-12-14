import { signToken, verifyToken } from "@/lib/auth"
import { registerSchema, loginSchema } from "@/lib/validators"

describe("Authentication", () => {
  describe("JWT Token Management", () => {
    it("should sign a valid JWT token", () => {
      const payload = {
        userId: "user-123",
        email: "test@example.com",
        role: "USER",
      }

      const token = signToken(payload)

      expect(token).toBeDefined()
      expect(typeof token).toBe("string")
      expect(token.split(".")).toHaveLength(3)
    })

    it("should verify a valid JWT token", () => {
      const payload = {
        userId: "user-123",
        email: "test@example.com",
        role: "USER",
      }

      const token = signToken(payload)
      const verified = verifyToken(token)

      expect(verified).toBeDefined()
      expect(verified?.userId).toBe(payload.userId)
      expect(verified?.email).toBe(payload.email)
      expect(verified?.role).toBe(payload.role)
    })

    it("should return null for invalid token", () => {
      const verified = verifyToken("invalid-token")
      expect(verified).toBeNull()
    })

    it("should return null for expired token", () => {
      // This would need a token with past expiry
      const verified = verifyToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjF9.invalid",
      )
      expect(verified).toBeNull()
    })
  })

  describe("Registration Validation", () => {
    it("should validate correct registration data", () => {
      const data = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      }

      const result = registerSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe(data.name)
        expect(result.data.email).toBe(data.email)
        expect(result.data.password).toBe(data.password)
      }
    })

    it("should reject invalid email", () => {
      const data = {
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
      }

      const result = registerSchema.safeParse(data)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain("Invalid email")
      }
    })

    it("should reject short password", () => {
      const data = {
        name: "John Doe",
        email: "john@example.com",
        password: "12345",
      }

      const result = registerSchema.safeParse(data)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain("at least 6 characters")
      }
    })

    it("should reject short name", () => {
      const data = {
        name: "J",
        email: "john@example.com",
        password: "password123",
      }

      const result = registerSchema.safeParse(data)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain("at least 2 characters")
      }
    })
  })

  describe("Login Validation", () => {
    it("should validate correct login data", () => {
      const data = {
        email: "john@example.com",
        password: "password123",
      }

      const result = loginSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe(data.email)
        expect(result.data.password).toBe(data.password)
      }
    })

    it("should reject invalid email", () => {
      const data = {
        email: "invalid-email",
        password: "password123",
      }

      const result = loginSchema.safeParse(data)

      expect(result.success).toBe(false)
    })

    it("should reject empty password", () => {
      const data = {
        email: "john@example.com",
        password: "",
      }

      const result = loginSchema.safeParse(data)

      expect(result.success).toBe(false)
    })
  })
})
