import { IconFridge } from '@tabler/icons-react'
import { useState } from 'react'

import { type Material, MaterialGuideBottomSheet } from './material-guide-buttom-sheet'

type MaterialGuideButtonProps = {
  materials?: Material[]
}

// 예시 재료 데이터
const EXAMPLE_MATERIALS: Material[] = [
  { id: '1', name: '김치', amount: '1/4포기' },
  { id: '2', name: '돼지고기', amount: '200g', isInCart: true },
  { id: '3', name: '양파', amount: '1개' },
  { id: '4', name: '대파', amount: '1대' },
  { id: '5', name: '두부', amount: '1/2모' },
]

export const MaterialGuideButton = ({
  materials = EXAMPLE_MATERIALS,
}: MaterialGuideButtonProps) => {
  const [isMaterialBottomSheetOpened, setIsMaterialBottomSheetOpened] = useState(false)

  const handleOpenMaterialBottomSheet = () => {
    setIsMaterialBottomSheetOpened(true)
  }

  const handleCloseMaterialBottomSheet = () => {
    setIsMaterialBottomSheetOpened(false)
  }

  const handleAddToCart = (materialId: string) => {
    console.log('장바구니에 추가:', materialId)
    // TODO: 실제 장바구니 로직 구현
  }

  return (
    <>
      <button className="relative" onClick={handleOpenMaterialBottomSheet}>
        <IconFridge />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full ">
          <span className="h-4.5 flex items-center justify-center text-xs font-semibold">5</span>
        </div>
      </button>

      {/* 재료 보기 바텀시트 */}
      <MaterialGuideBottomSheet
        open={isMaterialBottomSheetOpened}
        onClose={handleCloseMaterialBottomSheet}
        materials={materials}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}
