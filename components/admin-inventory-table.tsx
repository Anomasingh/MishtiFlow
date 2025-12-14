"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Package } from "lucide-react"
import { EditSweetDialog } from "@/components/edit-sweet-dialog"
import { RestockDialog } from "@/components/restock-dialog"
import { DeleteSweetDialog } from "@/components/delete-sweet-dialog"

interface Sweet {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  description?: string
  imageUrl?: string
}

interface AdminInventoryTableProps {
  sweets: Sweet[]
}

export function AdminInventoryTable({ sweets }: AdminInventoryTableProps) {
  const router = useRouter()
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null)
  const [restockingSweet, setRestockingSweet] = useState<Sweet | null>(null)
  const [deletingSweet, setDeletingSweet] = useState<Sweet | null>(null)

  function handleSuccess() {
    setEditingSweet(null)
    setRestockingSweet(null)
    setDeletingSweet(null)
    router.refresh()
  }

  return (
    <>
      <div className="rounded-lg border-2 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Stock</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sweets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No sweets in inventory
                </TableCell>
              </TableRow>
            ) : (
              sweets.map((sweet) => (
                <TableRow key={sweet.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{sweet.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{sweet.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">₹{sweet.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={sweet.quantity === 0 ? "destructive" : sweet.quantity <= 10 ? "outline" : "default"}
                    >
                      {sweet.quantity} units
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setRestockingSweet(sweet)} title="Restock">
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingSweet(sweet)} title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setDeletingSweet(sweet)} title="Delete">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingSweet && (
        <EditSweetDialog sweet={editingSweet} open onClose={() => setEditingSweet(null)} onSuccess={handleSuccess} />
      )}
      {restockingSweet && (
        <RestockDialog
          sweet={restockingSweet}
          open
          onClose={() => setRestockingSweet(null)}
          onSuccess={handleSuccess}
        />
      )}
      {deletingSweet && (
        <DeleteSweetDialog
          sweet={deletingSweet}
          open
          onClose={() => setDeletingSweet(null)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  )
}
