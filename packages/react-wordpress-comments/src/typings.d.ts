export type CommentsRequestData = {
  post: number
  per_page: number
}

export type CommentData = {
  id: number
  post: number
  parent: number
  author: number
  author_name: string
  author_url: string
  date: string
  date_gmt: string
  content: {
    rendered: string
  }
  link: string
  status: string
  type: string
  author_avatar_urls: {
    "24": string
    "48": string
    "96": string
  }
  meta: Array<any>
}

export type User = {
  name: string
  email: string
  jwt: string
}

export type Translations = {
  mainHeading?: string
  leaveCommentHeading?: string
  loadingCommentsLabel?: string
  respondLinkLabel?: string
  loggedInUserIntro?: string
  nameInputLabel?: string
  emailInputLabel?: string
  commentInputLabel?: string
  commentInputPlaceholder?: string
  submitButtonLabel?: string
  cancelLinkLabel?: string
  commentsClosedNotice?: string
}
