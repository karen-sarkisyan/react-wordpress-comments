import React from "react"

type ResponseLinkProps = {
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  commentId: string
}

export default function ResponseLink(props: ResponseLinkProps) {
  return (
    <div className="comment-reply-link">
      <a onClick={props.onClick} href={`#${props.commentId}`} rel="nofollow">
        Respond &darr;
      </a>
    </div>
  )
}
