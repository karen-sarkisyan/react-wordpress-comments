import React from "react"

import { TranslationsContext } from "./context/translationsContext"

type ResponseLinkProps = {
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  commentId: string
}

export default function ResponseLink(props: ResponseLinkProps) {
  const translations = React.useContext(TranslationsContext)
  return (
    <div className="comment-reply-link">
      <a onClick={props.onClick} href={`#${props.commentId}`} rel="nofollow">
        {translations.respondLinkLabel}
      </a>
    </div>
  )
}
