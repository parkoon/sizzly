import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { PageAppBarWithBack, PageContent, PageLayout } from '@/components/layouts/page'
import { SaveSubtitleButton, type SaveSubtitleButtonRef } from '@/components/save-subtitle-button'
import { VideoController, type VideoControllerRef } from '@/components/video-controller'
import { VideoSubtitles } from '@/components/video-subtitles'
import { defaultSubtitles, getDialogue } from '@/data/dialogue'
import { SubtitleCarousel } from '@/features/video/components/subtitle-carousel'
import { YouTubePlayer, type YouTubePlayerRef } from '@/features/video/components/youtube-player'
import type { Subtitle } from '@/features/video/types'
import { useIsSentenceUpdated } from '@/stores/is-sentence-updated-store'
import { useGlobalModal } from '@/stores/modal-store'
import { useOnBoarding } from '@/stores/onboarding-store'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'

const VideoPage = () => {
  const { videoId } = useParams<{ videoId: string }>()

  const [subtitles, setSubtitles] = useState<Subtitle[]>(defaultSubtitles)
  const [isLoadingDialogues, setIsLoadingDialogues] = useState(true)

  const [currentDialogue, setCurrentDialogue] = useState<Subtitle>(subtitles[0])

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

  const { addSubtitle, removeSubtitle, getSavedSubtitle } = useSavedSubtitlesStore()

  const { isFirstSaveDialogue, setFirstSaveDialogue } = useOnBoarding()
  const { setIsSentenceUpdated } = useIsSentenceUpdated()

  const savedSubtitle = currentDialogue
    ? getSavedSubtitle(videoId!, currentDialogue.index.toString())
    : undefined

  const isSaved = !!savedSubtitle

  // Load dialogues for the current video
  useEffect(() => {
    if (!videoId) return

    console.log('ok')

    const loadDialogues = async () => {
      setIsLoadingDialogues(true)
      const data = await getSubtitle(videoId)
      console.log('🚀 ~ loadDialogues ~ data:', data)
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
    // })
  }

  const startTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // 100ms마다 현재 시간 업데이트 (더 부드러운 추적)
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime()
        console.log('🚀 ~ startTimeTracking ~ time:', time)

        if (isDialogueEnded(time, subtitles)) {
          handleDialogueEnded()
          return
        }

        // const hasSavedSubtitle = !!getSavedSubtitle(videoId!, currentDialogueRef.current.id)

        // if (!hasSavedSubtitle && hasCommentaryRef.current && time >= endTimeRef.current) {
        //   handleDialogueSaveGuide()
        //   return
        // }

        // const 시간에따른다이얼로그 = subtitles.find(d => {
        //   return time >= d.startTime && time < d.endTime
        // })

        // if (!시간에따른다이얼로그) {
        //   return
        // }

        // hasCommentaryRef.current = !!시간에따른다이얼로그.commentary
        // endTimeRef.current = timeCodeToSeconds(시간에따른다이얼로그.endTime)

        // setCurrentDialogue(시간에따른다이얼로그)
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
      <PageLayout>
        <PageAppBarWithBack title="Chọn câu thoại để lưu" />
        <PageContent>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">Đang tải phụ đề...</div>
          </div>
        </PageContent>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
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
          initialTime={0}
        />

        {/* 자막 담기 버튼 */}

        {/* <SaveSubtitleButton
          ref={saveButtonRef}
          onClick={handleSaveSubtitle}
          isSaved={isSaved}
          showTooltip={isFirstSaveDialogue}
        /> */}

        {/* 자막 캐러셀 */}
        {subtitles.length > 0 && (
          <div className="mt-4">
            <SubtitleCarousel
              subtitles={subtitles}
              currentIndex={subtitles.findIndex(s => s.index === currentDialogue?.index)}
              onSelect={index => {
                const selected = subtitles[index]
                setCurrentDialogue(selected)
                playerRef.current?.seekTo(selected.startTime)
              }}
            />
          </div>
        )}

        <VideoController
          ref={videoControllerRef}
          isPlaying={playerState === 1}
          togglePlay={handleTogglePlay}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </PageContent>
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

// 기본 자막 (비디오 ID

export default VideoPage
