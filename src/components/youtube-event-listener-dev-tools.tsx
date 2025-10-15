import { useEffect, useState } from 'react'

import type { YouTubeStateChangeDetail, YouTubeTimeUpdateDetail } from '@/types/youtube-events'
import { getPlayerStateText, YOUTUBE_PLAYER_STATES } from '@/types/youtube-events'

/**
 * YouTube 플레이어 커스텀 이벤트 사용 예제 컴포넌트
 *
 * window.addEventListener를 사용해서 YouTube 플레이어의
 * 시간 업데이트와 상태 변화를 감지하는 방법을 보여줍니다.
 */
export const YouTubeEventListenerDevTools = () => {
  const [timeInfo, setTimeInfo] = useState<YouTubeTimeUpdateDetail | null>(null)
  const [stateInfo, setStateInfo] = useState<YouTubeStateChangeDetail | null>(null)
  const [eventLog, setEventLog] = useState<string[]>([])

  const addLog = (message: string) => {
    setEventLog(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9), // 최대 10개까지만 유지
    ])
  }

  useEffect(() => {
    // 시간 업데이트 이벤트 리스너
    const handleTimeUpdate = (event: CustomEvent<YouTubeTimeUpdateDetail>) => {
      const { currentTime, duration } = event.detail
      setTimeInfo(event.detail)

      // 1초마다 로그 (너무 많은 로그 방지)
      if (Math.floor(currentTime) % 1 === 0 && currentTime > 0) {
        addLog(`시간 업데이트: ${Math.floor(currentTime)}초 / ${Math.floor(duration)}초`)
      }
    }

    // 상태 변화 이벤트 리스너
    const handleStateChange = (event: CustomEvent<YouTubeStateChangeDetail>) => {
      const { state, videoId } = event.detail
      setStateInfo(event.detail)

      const stateText = getPlayerStateText(state)
      addLog(`상태 변화: ${stateText} (${state}) - ${videoId}`)

      // 특정 상태에 대한 추가 액션
      if (state === YOUTUBE_PLAYER_STATES.ENDED) {
        addLog('🎉 동영상 재생이 완료되었습니다!')
      } else if (state === YOUTUBE_PLAYER_STATES.PLAYING) {
        addLog('▶️ 동영상 재생이 시작되었습니다.')
      } else if (state === YOUTUBE_PLAYER_STATES.PAUSED) {
        addLog('⏸️ 동영상이 일시정지되었습니다.')
      }
    }

    // 이벤트 리스너 등록
    window.addEventListener('onYoutubeTimeUpdate', handleTimeUpdate)
    window.addEventListener('onYoutubeStateChange', handleStateChange)

    addLog('🎧 YouTube 이벤트 리스너가 등록되었습니다.')

    // 클린업
    return () => {
      window.removeEventListener('onYoutubeTimeUpdate', handleTimeUpdate)
      window.removeEventListener('onYoutubeStateChange', handleStateChange)
      addLog('🔌 YouTube 이벤트 리스너가 해제되었습니다.')
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    if (!timeInfo || !timeInfo.duration) return 0
    return (timeInfo.currentTime / timeInfo.duration) * 100
  }

  return (
    <div className="p-4 space-y-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-bold">YouTube 이벤트 모니터</h3>

      {/* 현재 재생 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold mb-2">⏱️ 시간 정보</h4>
          {timeInfo ? (
            <div className="space-y-2">
              <div>
                <strong>현재 시간:</strong> {formatTime(timeInfo.currentTime)}
              </div>
              <div>
                <strong>총 길이:</strong> {formatTime(timeInfo.duration)}
              </div>
              <div>
                <strong>진행률:</strong> {getProgressPercentage().toFixed(1)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">시간 정보 없음</p>
          )}
        </div>

        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold mb-2">🎮 상태 정보</h4>
          {stateInfo ? (
            <div className="space-y-2">
              <div>
                <strong>현재 상태:</strong> {getPlayerStateText(stateInfo.state)}
              </div>
              <div>
                <strong>상태 코드:</strong> {stateInfo.state}
              </div>
              <div>
                <strong>비디오 ID:</strong> {stateInfo.videoId}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">상태 정보 없음</p>
          )}
        </div>
      </div>

      {/* 이벤트 로그 */}
      <div className="bg-white p-3 rounded border">
        <h4 className="font-semibold mb-2">📋 이벤트 로그</h4>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {eventLog.length > 0 ? (
            eventLog.map((log, index) => (
              <div key={index} className="text-sm font-mono bg-gray-50 p-2 rounded">
                {log}
              </div>
            ))
          ) : (
            <p className="text-gray-500">이벤트 로그 없음</p>
          )}
        </div>
      </div>

      {/* 사용법 안내 */}
      <div className="bg-blue-50 p-3 rounded border border-blue-200">
        <h4 className="font-semibold mb-2 text-blue-800">💡 사용법</h4>
        <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
          {`// 시간 업데이트 이벤트 리스닝
window.addEventListener('onYoutubeTimeUpdate', (event) => {
  const { currentTime, duration, videoId } = event.detail
  console.log('시간 업데이트:', currentTime)
})

// 상태 변화 이벤트 리스닝
window.addEventListener('onYoutubeStateChange', (event) => {
  const { state, videoId } = event.detail
  console.log('상태 변화:', state)
})`}
        </pre>
      </div>
    </div>
  )
}
