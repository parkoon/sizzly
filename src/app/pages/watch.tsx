import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import ringSound from '@/assets/ring.mp3'
import { Page, PageAppBarWithBack, PageContent } from '@/components/layout/page'
import { SaveSubtitleButton, type SaveSubtitleButtonRef } from '@/components/save-subtitle-button'
import { VideoController, type VideoControllerRef } from '@/components/video-controller'
import { VideoSubtitles } from '@/components/video-subtitles'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube-player'
import { paths } from '@/config/paths'
import { defaultSubtitles, getDialogue } from '@/data/dialogue'
import { useIsSentenceUpdated } from '@/stores/is-sentence-updated-store'
import { useGlobalModal } from '@/stores/modal-store'
import { useOnBoarding } from '@/stores/onboarding-store'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'
import type { Dialogue } from '@/types/youtube'
import { timeCodeToSeconds } from '@/utils/time'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()

  const [dialogues, setDialogues] = useState<Dialogue[]>(defaultSubtitles)
  const [isLoadingDialogues, setIsLoadingDialogues] = useState(true)

  const [currentDialogue, setCurrentDialogue] = useState<Dialogue>(dialogues[0])
  const [isRepeatMode, setIsRepeatMode] = useState(false)

  const navigate = useNavigate()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const saveButtonRef = useRef<SaveSubtitleButtonRef>(null)
  const videoControllerRef = useRef<VideoControllerRef>(null)

  const [playerState, setPlayerState] = useState(-1)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // isRepeatMode의 최신 값을 참조하기 위한 ref
  const isRepeatModeRef = useRef(isRepeatMode)
  const hasCommentaryRef = useRef(false)
  const endTimeRef = useRef(0)
  const currentDialogueRef = useRef(currentDialogue)

  const modal = useGlobalModal()

  const { addSubtitle, removeSubtitle, getSavedSubtitle } = useSavedSubtitlesStore()

  const { isFirstSaveDialogue, setFirstSaveDialogue } = useOnBoarding()
  const { setIsSentenceUpdated } = useIsSentenceUpdated()

  const savedSubtitle = currentDialogue ? getSavedSubtitle(videoId!, currentDialogue.id) : undefined

  const isSaved = !!savedSubtitle

  // Load dialogues for the current video
  useEffect(() => {
    if (!videoId) return

    const loadDialogues = async () => {
      setIsLoadingDialogues(true)
      const data = await getDialogue(videoId)
      setDialogues(data)
      if (data.length > 0) {
        setCurrentDialogue(data[0])
      }
      setIsLoadingDialogues(false)
    }

    loadDialogues()
  }, [videoId])

  // isRepeatMode 상태가 변경될 때마다 ref 동기화
  useEffect(() => {
    isRepeatModeRef.current = isRepeatMode
  }, [isRepeatMode])

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

  const handleToggleRepeat = () => {
    setIsRepeatMode(prev => {
      const newValue = !prev
      // ref도 함께 업데이트
      isRepeatModeRef.current = newValue
      return newValue
    })
  }

  const handlePrevious = () => {
    const currentIndex = dialogues.findIndex(d => d.id === currentDialogue?.id)
    const prevIndex = currentIndex - 1
    const prevDialogue = dialogues[prevIndex]

    // 이전 다이얼로그가 없음
    if (!prevDialogue) {
      return
    }

    if (playerRef) {
      setCurrentDialogue(prevDialogue)
      playerRef.current?.seekTo(timeCodeToSeconds(prevDialogue.startTime))
    }
  }

  const handleNext = () => {
    const currentIndex = dialogues.findIndex(d => d.id === currentDialogue?.id)
    const nextIndex = currentIndex + 1
    const nextDialogue = dialogues[nextIndex]

    // 다음 다이얼로그가 없음
    if (!nextDialogue) {
      return
    }

    if (playerRef) {
      setCurrentDialogue(nextDialogue)
      playerRef.current?.seekTo(timeCodeToSeconds(nextDialogue.startTime))
    }
  }

  const handleSaveSubtitle = () => {
    setFirstSaveDialogue(false)

    if (isSaved && savedSubtitle) {
      removeSubtitle(savedSubtitle.id)
      setIsSentenceUpdated(false)

      return
    }
    addSubtitle(videoId!, currentDialogue!)
    setIsSentenceUpdated(true)
  }

  const handleDialogueSaveGuide = async () => {
    playerRef.current?.pause()
    stopTimeTracking()
    const audio = new Audio(ringSound)
    await Promise.all([saveButtonRef.current?.animate(), audio.play()])
    videoControllerRef.current?.startBlink()
    addSubtitle(videoId!, currentDialogueRef.current!)
  }

  const handleDialogueEnded = () => {
    playerRef.current?.pause()

    modal.open({
      title: 'Xem xong video rồi!',
      description: 'Bạn có muốn xem thư viện không?',
      okButtonProps: {
        children: 'Có',
      },
      cancelButtonProps: {
        children: 'Không',
      },
      onOk: () => {
        navigate(paths.my.sentences.getHref())
      },
      onCancel: () => {},
    })
  }

  const handleRepeatMode = (time: number) => {
    const endTime = timeCodeToSeconds(currentDialogue.endTime)

    if (time >= endTime) {
      playerRef.current?.seekTo(timeCodeToSeconds(currentDialogue.startTime))
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

        if (isDialogueEnded(time, dialogues)) {
          handleDialogueEnded()
          return
        }

        const isRepeatMode = isRepeatModeRef.current

        if (isRepeatMode) {
          handleRepeatMode(time)
          return
        }

        const hasSavedSubtitle = !!getSavedSubtitle(videoId!, currentDialogueRef.current.id)

        if (!hasSavedSubtitle && hasCommentaryRef.current && time >= endTimeRef.current) {
          handleDialogueSaveGuide()
          return
        }

        const 시간에따른다이얼로그 = dialogues.find(d => {
          return time >= timeCodeToSeconds(d.startTime) && time < timeCodeToSeconds(d.endTime)
        })

        if (!시간에따른다이얼로그) {
          return
        }

        hasCommentaryRef.current = !!시간에따른다이얼로그.commentary
        endTimeRef.current = timeCodeToSeconds(시간에따른다이얼로그.endTime)

        setCurrentDialogue(시간에따른다이얼로그)
      }
    }, 200)
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
    return (
      <Page>
        <PageAppBarWithBack title="Chọn câu thoại để lưu" />
        <PageContent>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">Đang tải phụ đề...</div>
          </div>
        </PageContent>
      </Page>
    )
  }

  return (
    <Page>
      <PageAppBarWithBack title="Chọn câu thoại để lưu" />

      {/* <Button
        onClick={() => {
          playerRef.current?.seekTo(1047)
        }}
      >
        zz
      </Button> */}
      <PageContent noSidePadding>
        <YouTubePlayer
          onStateChange={handleStateChange}
          ref={playerRef}
          videoId={videoId}
          initialTime={timeCodeToSeconds(dialogues[0].startTime)}
        />

        {/* 자막 담기 버튼 */}

        <SaveSubtitleButton
          ref={saveButtonRef}
          onClick={handleSaveSubtitle}
          isSaved={isSaved}
          showTooltip={isFirstSaveDialogue}
        />

        {/* 현재 자막 표시 */}
        {currentDialogue && <VideoSubtitles data={currentDialogue} />}

        <VideoController
          ref={videoControllerRef}
          isPlaying={playerState === 1}
          isRepeatMode={isRepeatMode}
          togglePlay={handleTogglePlay}
          onPrevious={handlePrevious}
          onNext={handleNext}
          toggleRepeat={handleToggleRepeat}
        />
      </PageContent>
    </Page>
  )
}

const isDialogueEnded = (time: number, dialogues: Dialogue[]) => {
  const lastDialogue = dialogues[dialogues.length - 1]
  return time >= timeCodeToSeconds(lastDialogue.endTime)
}

export default WatchPage
