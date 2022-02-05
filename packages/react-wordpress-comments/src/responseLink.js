import React from "react"
export default function ResponseLink(props) {
  return (
    <div className="comment-reply-link">
      <a onClick={props.onClick} href={`#${props.commentId}`} rel="nofollow">
        Respond &darr;
      </a>
    </div>
  )
}
