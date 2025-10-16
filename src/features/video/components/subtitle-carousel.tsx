import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect } from 'react'

import { cn } from '@/lib/utils'

import type { Subtitle } from '../types'

type SubtitleCarouselProps = {
  subtitles: Subtitle[]
  currentIndex: number
  onSelect: (index: number) => void
}

export const SubtitleCarousel = ({ subtitles, currentIndex, onSelect }: SubtitleCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: false,
  })

  // 현재 인덱스가 변경되면 해당 슬라이드로 스크롤
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(currentIndex)
    }
  }, [currentIndex, emblaApi])

  // 슬라이드 선택 시 콜백
  const handleSelect = useCallback(() => {
    if (!emblaApi) return
    const selected = emblaApi.selectedScrollSnap()
    onSelect(selected)
  }, [emblaApi, onSelect])

  // 카드 클릭 시 해당 슬라이드로 이동
  const handleCardClick = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index)
      }
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', handleSelect)
    return () => {
      emblaApi.off('select', handleSelect)
    }
  }, [emblaApi, handleSelect])

  return (
    <div className="overflow-hidden">
      <div ref={emblaRef}>
        <div className="flex gap-3 pl-4 pr-4">
          {subtitles.map((subtitle, index) => {
            const isActive = currentIndex === index

            return (
              <div
                key={subtitle.index}
                className="flex-[0_0_calc(100%-32px)]"
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={cn(
                    'bg-white p-4 transition-all border rounded border-gray-300 duration-300 cursor-pointer',
                    isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-50',
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        'text-xs font-semibold',
                        isActive ? 'text-purple-600' : 'text-gray-400',
                      )}
                    >
                      #{subtitle.index}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
                    </span>
                  </div>
                  <p
                    className={cn(
                      'text-base leading-relaxed',
                      isActive ? 'text-gray-900 font-medium' : 'text-gray-600',
                    )}
                  >
                    {subtitle.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
