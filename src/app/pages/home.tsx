import { IconShoppingCartStar } from '@tabler/icons-react'
import { useNavigate } from 'react-router'

import { Page, PageAppBarWithLogo, PageContent } from '@/components/layout/page'
import { MainVideoFeed } from '@/components/main-video-feed'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { VideoFeed } from '@/components/video-feed'
import { paths } from '@/config/paths'
import { videos } from '@/data/videos'
import { useIsSentenceUpdated } from '@/stores/is-sentence-updated-store'
import { useOnBoarding } from '@/stores/onboarding-store'

const HomePage = () => {
  const navigate = useNavigate()
  const { isSentenceUpdated } = useIsSentenceUpdated()
  const { isFirstPageView, setFirstPageView } = useOnBoarding()

  // const { categories, updateCategoryActive } = useCategories()

  // const handleCategoryActive = (data: Category) => {
  //   updateCategoryActive(data)
  // }
  return (
    <Page>
      <PageAppBarWithLogo
        right={
          <Tooltip open={isSentenceUpdated}>
            <TooltipTrigger>
              <div className="p-2" onClick={() => navigate(paths.my.sentences.getHref())}>
                <IconShoppingCartStar />
              </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={-10}>
              <p className="flex gap-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_723_1626)">
                    <path
                      d="M10.92 1.31091C11.6081 1.31091 12.2362 1.70325 12.5379 2.32166L16.8665 11.1994C18.1429 14.8615 15.4232 18.688 11.545 18.688H8.4648C4.58821 18.6878 1.87632 14.8552 3.16613 11.1994H3.17508L6.85998 3.64246C6.99216 3.37137 7.26722 3.19901 7.5688 3.19893C7.88775 3.19893 8.17576 3.39097 8.29797 3.68559L8.55187 4.29838L9.23547 2.47872C9.49894 1.77645 10.17 1.31102 10.92 1.31091Z"
                      fill="#F06555"
                    />
                    <path
                      d="M8.91312 9.98709C9.12273 9.54605 9.56746 9.26501 10.0558 9.26501C10.5503 9.26501 10.9995 9.55317 11.2057 10.0027L12.5536 12.941C13.3967 14.779 12.0537 16.8726 10.0315 16.8726C7.99299 16.8726 6.65039 14.748 7.52544 12.9068L8.91312 9.98709Z"
                      fill="#FFDE66"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_723_1626">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Đã lưu câu rồi
              </p>
            </TooltipContent>
          </Tooltip>
        }
      />

      <PageContent noSidePadding>
        {/* <CategoryTabs categories={categories} onCategoryClick={handleCategoryActive} /> */}

        <section className="px-4 mb-5 mt-2">
          <MainVideoFeed />
        </section>
        <VideoFeed videos={videos} />
      </PageContent>

      <BottomSheet open={isFirstPageView} onClose={() => setFirstPageView(false)}>
        <h2 className="text-lg font-bold mb-2">
          Học tiếng Hàn thực tế <br />
          qua video bạn yêu thích nhé!
        </h2>

        <p className="text-gray-600 mb-8">Mỗi ngày đều có video mới được cập nhật.</p>

        <img src="/images/onboarding.png" alt="onboarding-1" className="w-[70%] mx-auto mb-5" />

        <Button block size="lg" onClick={() => setFirstPageView(false)}>
          Bắt đầu
        </Button>
      </BottomSheet>
    </Page>
  )
}

export default HomePage
