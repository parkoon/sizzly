import type { Dialogue } from '@/types/youtube'

/**
 * Dynamically imports dialogue data for a specific video
 * This enables code splitting and reduces initial bundle size
 */
export const getDialogue = async (videoId: string): Promise<Dialogue[]> => {
  try {
    const module = await import(`./dialogues/${videoId}.ts`)
    return module.dialogues
  } catch (error) {
    console.error(`Failed to load dialogue for video: ${videoId}`, error)
    return defaultSubtitles
  }
}

// 기본 자막 (비디오 ID가 없을 때)
export const defaultSubtitles: Dialogue[] = [
  {
    id: '1',
    startTime: '00:00:00',
    endTime: '00:00:00',
    text: 'No subtitles available',
    translation: '자막을 사용할 수 없습니다',
  },
]
