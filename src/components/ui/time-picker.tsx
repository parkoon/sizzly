import type { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useRef } from 'react'

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 32
const WHEEL_ITEM_COUNT = 18
const WHEEL_ITEMS_IN_VIEW = 4

export const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
export const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW
export const WHEEL_RADIUS = Math.round(WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT))

type TimePickerProps = {
  initialMinutes?: number
  initialSeconds?: number
  onMinutesChange?: (value: number) => void
  onSecondsChange?: (value: number) => void
}

export const TimePicker = ({
  initialMinutes = 0,
  initialSeconds = 30,
  onMinutesChange,
  onSecondsChange,
}: TimePickerProps) => {
  return (
    <div className="relative flex w-full h-[22.2rem] max-w-[30rem] mx-auto">
      {/* 상단 그라데이션 오버레이 */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{
          top: '-0.5px',
          height: 'calc(50% - 16px)',
          borderBottom: '0.5px solid rgba(0, 0, 0, 0.3)',
          background:
            'linear-gradient(to top, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 1) 100%)',
        }}
      />

      {/* 하단 그라데이션 오버레이 */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{
          bottom: '-0.5px',
          height: 'calc(50% - 16px)',
          borderTop: '0.5px solid rgba(0, 0, 0, 0.3)',
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 1) 100%)',
        }}
      />

      <IosPickerItem
        slideCount={60}
        perspective="left"
        loop={false}
        label="분"
        initialValue={initialMinutes}
        onValueChange={onMinutesChange}
      />
      <IosPickerItem
        slideCount={60}
        perspective="right"
        loop={false}
        label="초"
        initialValue={initialSeconds}
        onValueChange={onSecondsChange}
      />
    </div>
  )
}

const isInView = (wheelLocation: number, slidePosition: number): boolean =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

const setSlideStyles = (
  emblaApi: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number,
): void => {
  const slideNode = emblaApi.slideNodes()[index]
  const wheelLocation = emblaApi.scrollProgress() * totalRadius
  const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius
  const positionLoopStart = positionDefault + totalRadius
  const positionLoopEnd = positionDefault - totalRadius

  let inView = false
  let angle = index * -WHEEL_ITEM_RADIUS

  if (isInView(wheelLocation, positionDefault)) {
    inView = true
  }

  if (loop && isInView(wheelLocation, positionLoopEnd)) {
    inView = true
    angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS
  }

  if (loop && isInView(wheelLocation, positionLoopStart)) {
    inView = true
    angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS
  }

  if (inView) {
    slideNode.style.opacity = '1'
    slideNode.style.transform = `translateY(-${
      index * 100
    }%) rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`
  } else {
    slideNode.style.opacity = '0'
    slideNode.style.transform = 'none'
  }
}

export const setContainerStyles = (emblaApi: EmblaCarouselType, wheelRotation: number): void => {
  emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`
}

type PropType = {
  loop?: boolean
  label: string
  slideCount: number
  perspective: 'left' | 'right'
  onValueChange?: (value: number) => void
  initialValue?: number
}

export const IosPickerItem: React.FC<PropType> = props => {
  const { slideCount, perspective, label, loop = false, onValueChange, initialValue = 0 } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    axis: 'y',
    dragFree: true,
    containScroll: false,
    watchSlides: false,
    startIndex: initialValue,
  })
  const rootNodeRef = useRef<HTMLDivElement>(null)
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS
  const slides = Array.from(Array(slideCount).keys())

  const inactivateEmblaTransform = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return
    const { translate, slideLooper } = emblaApi.internalEngine()
    translate.clear()
    translate.toggleActive(false)
    slideLooper.loopPoints.forEach(({ translate }) => {
      translate.clear()
      translate.toggleActive(false)
    })
  }, [])

  const rotateWheel = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset
      const wheelRotation = rotation * emblaApi.scrollProgress()
      setContainerStyles(emblaApi, wheelRotation)
      emblaApi.slideNodes().forEach((_, index) => {
        setSlideStyles(emblaApi, index, loop, slideCount, totalRadius)
      })
    },
    [slideCount, rotationOffset, totalRadius, loop],
  )

  const handleSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const selectedIndex = emblaApi.selectedScrollSnap()
      onValueChange?.(selectedIndex)
    },
    [onValueChange],
  )

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('pointerUp', emblaApi => {
      const { scrollTo, target, location } = emblaApi.internalEngine()
      const diffToTarget = target.get() - location.get()
      const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1
      const distance = diffToTarget * factor
      scrollTo.distance(distance, true)
    })

    emblaApi.on('scroll', rotateWheel)
    emblaApi.on('settle', handleSelect)

    emblaApi.on('reInit', emblaApi => {
      inactivateEmblaTransform(emblaApi)
      rotateWheel(emblaApi)
    })

    inactivateEmblaTransform(emblaApi)
    rotateWheel(emblaApi)

    // 초기값 콜백 호출
    handleSelect(emblaApi)
  }, [emblaApi, inactivateEmblaTransform, rotateWheel, handleSelect])

  return (
    <div className="h-full flex items-center min-w-[50%] justify-center leading-none text-[1.8rem]">
      <div
        className="min-w-full h-full overflow-hidden flex items-center touch-pan-x"
        ref={rootNodeRef}
      >
        <div
          className="h-8 w-full select-none"
          style={{
            perspective: '1000px',
            perspectiveOrigin:
              perspective === 'left' ? 'calc(50% + 130px) 50%' : 'calc(50% - 130px) 50%',
            transform: perspective === 'left' ? 'translateX(27px)' : 'translateX(-27px)',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}
          ref={emblaRef}
        >
          <div
            className="h-full w-full"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {slides.map((_, index) => (
              <div
                className="w-full h-full text-[19px] text-center flex items-center justify-center opacity-0"
                style={{
                  backfaceVisibility: 'hidden',
                }}
                key={index}
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="font-bold -translate-x-[55px] pointer-events-none text-sm">{label}</div>
    </div>
  )
}
