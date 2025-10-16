import { IconShoppingCart } from '@tabler/icons-react'

import { BottomSheet } from '@/components/ui/bottom-sheet'
import { cn } from '@/lib/utils'

export type Material = {
  id: string
  name: string
  amount: string
  isInCart?: boolean
}

type MaterialGuideBottomSheetProps = {
  open: boolean
  onClose: () => void
  materials: Material[]
  onAddToCart?: (materialId: string) => void
}

export const MaterialGuideBottomSheet = ({
  open,
  onClose,
  materials,
  onAddToCart,
}: MaterialGuideBottomSheetProps) => {
  const handleAddToCart = (materialId: string) => {
    onAddToCart?.(materialId)
  }

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={
        <p>
          재료 <span className="text-sm text-gray-500">{materials.length}개</span>
        </p>
      }
    >
      <div className="space-y-3">
        {materials.map(material => {
          return (
            <div key={material.id} className="flex items-center justify-between ">
              <div className="flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-900">{material.name}</span>
                  <span className="text-sm text-gray-500">{material.amount}</span>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(material.id)}
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-full border border-gray-400 text-gray-500',
                )}
              >
                <IconShoppingCart className="w-5 h-5" />
              </button>
            </div>
          )
        })}
      </div>
    </BottomSheet>
  )
}
