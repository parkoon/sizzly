import { IconBookmark, IconBookmarkFilled, IconSalad } from '@tabler/icons-react'
import { useState } from 'react'

import { type Material, MaterialGuideBottomSheet } from './material-guide-buttom-sheet'

type ToolbarProps = {
  onTimerStateChange?: (isRunning: boolean) => void
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

export const Toolbar = ({ materials = EXAMPLE_MATERIALS }: ToolbarProps) => {
  const [isMaterialBottomSheetOpened, setIsMaterialBottomSheetOpened] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

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

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <>
      {/* 타이머 버튼 */}

      <div className="bg-white px-4 py-6 flex-1">
        <p className="mb-2">Lorem ipsum dolor</p>
        <div className="flex items-center gap-2 ">
          <button
            className="bg-white flex items-center gap-1 py-1.5 px-3 rounded-full border border-gray-400 text-gray-800"
            onClick={handleOpenMaterialBottomSheet}
          >
            <IconSalad className="w-5 h-5" />
            <span className="h-4 text-sm font-semibold">5</span>
          </button>
          <button
            className="bg-white p-1.5 rounded-full border border-gray-400 text-gray-800"
            onClick={handleToggleBookmark}
          >
            {isBookmarked ? (
              <IconBookmarkFilled className="w-5 h-5" />
            ) : (
              <IconBookmark className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      {/* <div>
        <button onClick={handleOpenSheet}>
          <IconStopwatch className="w-6 h-6" />
        </button>
      </div> */}

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
