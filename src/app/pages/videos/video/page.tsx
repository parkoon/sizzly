import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { PageLayout } from '@/components/layouts/page'
import { type SaveSubtitleButtonRef } from '@/components/save-subtitle-button'
import { TimePickerBottomSheet } from '@/components/time-picker-bottom-sheet'
import { type VideoControllerRef } from '@/components/video-controller'
import { VideoSubtitles } from '@/components/video-subtitles'
import { defaultSubtitles } from '@/data/dialogue'
import { TimerList } from '@/features/video/components/timer-list'
import { TimerOverlay } from '@/features/video/components/timer-overlay'
import { YouTubePlayer, type YouTubePlayerRef } from '@/features/video/components/youtube-player'
import type { Subtitle } from '@/features/video/types'
import { useIsSentenceUpdated } from '@/stores/is-sentence-updated-store'
import { useGlobalModal } from '@/stores/modal-store'
import { useOnBoarding } from '@/stores/onboarding-store'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'

import { BookmarkButton } from './_components/bookmark-button'
import { type Material, MaterialAccordion } from './_components/material-accordion'
import { SubtitleProgressBar } from './_components/subtitle-progress-bar'

// 예시 재료 데이터 (추후 API로 대체 가능)
const mockMaterials: Material[] = [
  { id: '1', name: '당근', amount: '2개' },
  { id: '2', name: '버터', amount: '30g' },
  { id: '3', name: '설탕', amount: '2큰술' },
  { id: '4', name: '간장', amount: '1큰술' },
  { id: '5', name: '물', amount: '100ml' },
]

const VideoPage = () => {
  const { videoId } = useParams<{ videoId: string }>()
  const [isTimerBottomSheetOpened, setIsTimerBottomSheetOpened] = useState(false)
  const [isRepeatMode, setIsRepeatMode] = useState(false)
  const [subtitles, setSubtitles] = useState<Subtitle[]>(defaultSubtitles)
  const [isLoadingDialogues, setIsLoadingDialogues] = useState(true)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerDuration, setTimerDuration] = useState(0)
  const [currentDialogue, setCurrentDialogue] = useState<Subtitle>(subtitles[0])
  const isRepeatModeRef = useRef(isRepeatMode)
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)

  const navigate = useNavigate()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const saveButtonRef = useRef<SaveSubtitleButtonRef>(null)
  const videoControllerRef = useRef<VideoControllerRef>(null)

  const [playerState, setPlayerState] = useState(-1)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // isRepeatMode의 최신 값을 참조하기 위한 ref
  const hasCommentaryRef = useRef(false)
  const endTimeRef = useRef(0)
  const currentDialogueRef = useRef(currentDialogue)

  const modal = useGlobalModal()

  console.log(currentDialogue)

  const { addSubtitle, removeSubtitle, getSavedSubtitle } = useSavedSubtitlesStore()

  const { isFirstSaveDialogue, setFirstSaveDialogue } = useOnBoarding()
  const { setIsSentenceUpdated } = useIsSentenceUpdated()

  const savedSubtitle = currentDialogue
    ? getSavedSubtitle(videoId!, currentDialogue.index.toString())
    : undefined

  const isSaved = !!savedSubtitle

  const handleTimeConfirm = (minutes: number, seconds: number) => {
    const totalSeconds = minutes * 60 + seconds
    setTimerDuration(totalSeconds)
    setIsTimerRunning(true)
    setIsTimerBottomSheetOpened(false)
  }

  const handleCloseTimer = () => {
    setIsTimerRunning(false)
    setTimerDuration(0)
  }

  const handleTimerComplete = () => {
    alert('타이머가 종료되었습니다!')
    setIsTimerRunning(false)
    setTimerDuration(0)
  }

  const handleOpenTimerBottomSheet = () => {
    setIsTimerBottomSheetOpened(true)
  }

  const handleCloseTimerBottomSheet = () => {
    setIsTimerBottomSheetOpened(false)
  }

  // Load dialogues for the current video
  useEffect(() => {
    if (!videoId) return

    const loadDialogues = async () => {
      setIsLoadingDialogues(true)
      const data = await getSubtitle(videoId)
      setSubtitles(data)
      if (data.length > 0) {
        setCurrentDialogue(data[0])
      }
      setIsLoadingDialogues(false)
    }

    loadDialogues()
  }, [videoId])

  useEffect(() => {
    currentDialogueRef.current = currentDialogue
  }, [currentDialogue])

  const handleTogglePlay = () => {
    if (playerState === 1) {
      playerRef.current?.pause()

      return
    }

    hasCommentaryRef.current = false
    endTimeRef.current = 0
    videoControllerRef.current?.stopBlink()

    playerRef.current?.play()
  }

  const handlePrevious = () => {
    const currentIndex = subtitles.findIndex(d => d.index === currentDialogue?.index)
    const prevIndex = currentIndex - 1
    const prevDialogue = subtitles[prevIndex]

    // 이전 다이얼로그가 없음
    if (!prevDialogue) {
      return
    }

    if (playerRef) {
      setCurrentDialogue(prevDialogue)
      playerRef.current?.seekTo(prevDialogue.startTime)
    }
  }

  const handleNext = () => {
    const currentIndex = subtitles.findIndex(d => d.index === currentDialogue?.index)
    const nextIndex = currentIndex + 1
    const nextDialogue = subtitles[nextIndex]

    // 다음 다이얼로그가 없음
    if (!nextDialogue) {
      return
    }

    if (playerRef) {
      setCurrentDialogue(nextDialogue)
      playerRef.current?.seekTo(nextDialogue.startTime)
    }
  }

  const handleToggleRepeat = () => {
    setIsRepeatMode(prev => {
      const newValue = !prev
      // ref도 함께 업데이트
      isRepeatModeRef.current = newValue
      return newValue
    })
  }

  //   const handleDialogueSaveGuide = async () => {
  //     playerRef.current?.pause()
  //     stopTimeTracking()
  //     const audio = new Audio(ringSound)
  //     await Promise.all([saveButtonRef.current?.animate(), audio.play()])
  //     videoControllerRef.current?.startBlink()
  //     addSubtitle(videoId!, currentDialogueRef.current!)
  //   }

  const handleDialogueEnded = () => {
    playerRef.current?.pause()

    alert('가이드 종료')

    // modal.open({
    //   title: 'Xem xong video rồi!',
    //   description: 'Bạn có muốn xem thư viện không?',
    //   okButtonProps: {
    //     children: 'Có',
    //   },
    //   cancelButtonProps: {
    //     children: 'Không',
    //   },
    //   onOk: () => {
    //     navigate(paths.my.sentences.getHref())
    //   },
    //   onCancel: () => {},
    // })=
  }

  const handleRepeatMode = (time: number) => {
    const endTime = currentDialogue.endTime

    if (time >= endTime) {
      playerRef.current?.seekTo(currentDialogue.startTime)
      setCurrentDialogue(currentDialogue)
    }
  }

  const startTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // 100ms마다 현재 시간 업데이트 (더 부드러운 추적)
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime()

        if (isDialogueEnded(time, subtitles)) {
          handleDialogueEnded()
          return
        }

        const isRepeatMode = isRepeatModeRef.current
        console.log('🚀 ~ startTimeTracking ~ isRepeatMode:', isRepeatMode)

        if (isRepeatMode) {
          handleRepeatMode(time)
          return
        }

        const 시간에따른다이얼로그 = subtitles.find(d => {
          return time >= d.startTime && time < d.endTime
        })

        if (!시간에따른다이얼로그) {
          return
        }

        // 현재 다이얼로그와 다를 때만 업데이트
        setCurrentDialogue(시간에따른다이얼로그)
      }
    }, 100)
  }

  const stopTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleStateChange = (state: number) => {
    const isPlaying = state === 1

    setPlayerState(state)

    if (isPlaying) {
      startTimeTracking()

      return
    }
    stopTimeTracking()
  }

  if (!videoId) {
    return <div className="p-4">Không tìm thấy video.</div>
  }

  if (isLoadingDialogues) {
    return <div>로딩중...</div>
  }

  return (
    <PageLayout title="버터 당근 조림">
      <YouTubePlayer
        onStateChange={handleStateChange}
        ref={playerRef}
        videoId={videoId}
        initialTime={0}
        disabled={isTimerRunning}
      />
      <SubtitleProgressBar current={currentDialogue?.index ?? 0} total={subtitles.length} />
      <MaterialAccordion materials={materials} />

      <div className="p-4">
        <TimerList
          onTimerComplete={() => {
            alert('타이머가 종료되었습니다!')
          }}
        />
      </div>

      {currentDialogue && <VideoSubtitles data={currentDialogue} />}

      <TimePickerBottomSheet
        open={isTimerBottomSheetOpened}
        onClose={handleCloseTimerBottomSheet}
        onConfirm={handleTimeConfirm}
      />

      <TimerOverlay
        isOpen={isTimerRunning}
        duration={timerDuration}
        onClose={handleCloseTimer}
        onComplete={handleTimerComplete}
      />
    </PageLayout>
  )
}

const isDialogueEnded = (time: number, subtitles: Subtitle[]) => {
  const lastDialogue = subtitles[subtitles.length - 1]
  return time >= lastDialogue.endTime
}

const getSubtitle = async (videoId: string): Promise<Subtitle[]> => {
  try {
    const response = await fetch(`/subtitles/${videoId}.json`)
    if (!response.ok) {
      throw new Error(`Failed to fetch subtitle: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Failed to load subtitle for video: ${videoId}`, error)
    return defaultSubtitles
  }
}

export default VideoPage
