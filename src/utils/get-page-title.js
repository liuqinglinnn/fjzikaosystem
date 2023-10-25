import defaultSettings from '@/settings'

const title = defaultSettings.title || '编排系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
