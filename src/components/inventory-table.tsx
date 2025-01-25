"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Checkbox } from "./ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"
import type { Category, Item } from "@/types/inventory"
import { useInventoryStore } from "@/store/inventory"
import { EditItemModal } from "./edit-item-model"

interface InventoryTableProps {
  selectedCategories: Category[]
}

export function InventoryTable({ selectedCategories }: InventoryTableProps) {
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const { items, selectedItems, toggleItemSelection, deleteItem } = useInventoryStore()

  const filteredItems = items
    .filter((item) => (selectedCategories.length === 0 ? true : selectedCategories.includes(item.category)))
    .sort((a, b) => a.quantity - b.quantity)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} className={item.quantity < 10 ? "bg-red-500/10" : undefined}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="capitalize">{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingItem(item)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => deleteItem(item.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingItem && <EditItemModal item={editingItem} isOpen={true} onClose={() => setEditingItem(null)} />}
    </>
  )
}

