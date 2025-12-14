import { sweetSchema, updateSweetSchema, purchaseSchema, restockSchema } from "@/lib/validators"

describe("Validators", () => {
  describe("Sweet Schema", () => {
    it("should validate correct sweet data", () => {
      const data = {
        name: "Gulab Jamun",
        category: "Milk Based",
        price: 45,
        quantity: 100,
        description: "Delicious milk dumplings",
        imageUrl: "https://example.com/image.jpg",
      }

      const result = sweetSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe(data.name)
        expect(result.data.price).toBe(data.price)
        expect(result.data.quantity).toBe(data.quantity)
      }
    })

    it("should reject empty name", () => {
      const data = {
        name: "",
        category: "Milk Based",
        price: 45,
        quantity: 100,
      }

      const result = sweetSchema.safeParse(data)

      expect(result.success).toBe(false)
    })

    it("should reject negative price", () => {
      const data = {
        name: "Gulab Jamun",
        category: "Milk Based",
        price: -10,
        quantity: 100,
      }

      const result = sweetSchema.safeParse(data)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain("positive")
      }
    })

    it("should reject negative quantity", () => {
      const data = {
        name: "Gulab Jamun",
        category: "Milk Based",
        price: 45,
        quantity: -5,
      }

      const result = sweetSchema.safeParse(data)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain("non-negative")
      }
    })

    it("should allow optional fields to be undefined", () => {
      const data = {
        name: "Gulab Jamun",
        category: "Milk Based",
        price: 45,
        quantity: 100,
      }

      const result = sweetSchema.safeParse(data)

      expect(result.success).toBe(true)
    })
  })

  describe("Purchase Schema", () => {
    it("should validate correct purchase data", () => {
      const data = { quantity: 5 }

      const result = purchaseSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.quantity).toBe(5)
      }
    })

    it("should reject zero quantity", () => {
      const data = { quantity: 0 }

      const result = purchaseSchema.safeParse(data)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain("positive")
      }
    })

    it("should reject negative quantity", () => {
      const data = { quantity: -3 }

      const result = purchaseSchema.safeParse(data)

      expect(result.success).toBe(false)
    })

    it("should reject decimal quantity", () => {
      const data = { quantity: 2.5 }

      const result = purchaseSchema.safeParse(data)

      expect(result.success).toBe(false)
    })
  })

  describe("Restock Schema", () => {
    it("should validate correct restock data", () => {
      const data = { quantity: 50 }

      const result = restockSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.quantity).toBe(50)
      }
    })

    it("should reject zero quantity", () => {
      const data = { quantity: 0 }

      const result = restockSchema.safeParse(data)

      expect(result.success).toBe(false)
    })

    it("should reject negative quantity", () => {
      const data = { quantity: -10 }

      const result = restockSchema.safeParse(data)

      expect(result.success).toBe(false)
    })
  })

  describe("Update Sweet Schema", () => {
    it("should allow partial updates", () => {
      const data = { price: 50 }

      const result = updateSweetSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.price).toBe(50)
        expect(result.data.name).toBeUndefined()
      }
    })

    it("should allow updating multiple fields", () => {
      const data = {
        name: "Updated Name",
        price: 60,
        quantity: 150,
      }

      const result = updateSweetSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe("Updated Name")
        expect(result.data.price).toBe(60)
        expect(result.data.quantity).toBe(150)
      }
    })

    it("should still validate negative values", () => {
      const data = { price: -50 }

      const result = updateSweetSchema.safeParse(data)

      expect(result.success).toBe(false)
    })
  })
})
