import { useEffect } from 'react'

import { Page, PageAppBarWithBack, PageContent } from '@/components/layout/page'
import { SavedSubtitleCard } from '@/components/saved-subtitle-card'
import { useIsSentenceUpdated } from '@/stores/is-sentence-updated-store'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'

const MySentencesPage = () => {
  const { savedSubtitles } = useSavedSubtitlesStore()
  const { setIsSentenceUpdated } = useIsSentenceUpdated()

  useEffect(() => {
    setIsSentenceUpdated(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Page>
      <PageAppBarWithBack title="Câu của tôi" />
      <PageContent>
        {savedSubtitles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">Chưa có câu nào của bạn</p>
            <p className="text-sm text-gray-400">Xem video và ghi lại phụ đề</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {savedSubtitles.map(savedSubtitle => (
              <SavedSubtitleCard key={savedSubtitle.id} savedSubtitle={savedSubtitle} />
            ))}
          </div>
        )}
      </PageContent>
    </Page>
  )
}

export default MySentencesPage
