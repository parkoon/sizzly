/**
 * YouTube 플레이어 커스텀 이벤트 타입 정의
 */

export type YouTubeTimeUpdateDetail = {
  currentTime: number
  duration: number
  videoId: string
}

export type YouTubeStateChangeDetail = {
  state: number
  videoId: string
  currentTime: number
  duration: number
}

// YouTube 플레이어 상태 상수
export const YOUTUBE_PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const

// 커스텀 이벤트 타입 확장
declare global {
  interface WindowEventMap {
    onYoutubeTimeUpdate: CustomEvent<YouTubeTimeUpdateDetail>
    onYoutubeStateChange: CustomEvent<YouTubeStateChangeDetail>
  }
}

/**
 * YouTube 플레이어 상태를 문자열로 변환하는 헬퍼 함수
 */
export const getPlayerStateText = (state: number): string => {
  switch (state) {
    case YOUTUBE_PLAYER_STATES.UNSTARTED:
      return '시작 전'
    case YOUTUBE_PLAYER_STATES.ENDED:
      return '종료됨'
    case YOUTUBE_PLAYER_STATES.PLAYING:
      return '재생 중'
    case YOUTUBE_PLAYER_STATES.PAUSED:
      return '일시정지'
    case YOUTUBE_PLAYER_STATES.BUFFERING:
      return '버퍼링'
    case YOUTUBE_PLAYER_STATES.CUED:
      return '준비됨'
    default:
      return '알 수 없음'
  }
}
