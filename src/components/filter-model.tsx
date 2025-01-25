"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import type { Category } from "@/types/inventory"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCategories: Category[]
  onCategoryChange: (category: Category) => void
  onReset: () => void
}

export function FilterModal({ isOpen, onClose, selectedCategories, onCategoryChange, onReset }: FilterModalProps) {
  const categories: Category[] = ["sports", "clothes", "watches", "mobiles"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter by Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onCategoryChange(category)}
                />
                <Label htmlFor={category} className="capitalize">
                  {category}
                </Label>
              </div>
            ))}
          </div>
          <Button onClick={onReset} variant="outline" className="w-full">
            Reset Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

