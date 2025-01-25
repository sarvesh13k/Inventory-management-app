"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import type { Category, Item } from "@/types/inventory"
import { useInventoryStore } from "@/store/inventory"

interface EditItemModalProps {
  item: Item
  isOpen: boolean
  onClose: () => void
}

export function EditItemModal({ item, isOpen, onClose }: EditItemModalProps) {
  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  const [quantity, setQuantity] = useState(item.quantity.toString())
  const [category, setCategory] = useState<Category>(item.category)

  const updateItem = useInventoryStore((state) => state.updateItem)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateItem(item.id, {
      name,
      description,
      quantity: Number.parseInt(quantity),
      category,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="clothes">Clothes</SelectItem>
                <SelectItem value="watches">Watches</SelectItem>
                <SelectItem value="mobiles">Mobiles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Update Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

