import React from "react"
import CreateComment from "./createComment"
import ResponseLink from "./responseLink"

import type { CommentData, User } from "./typings"

type CommentProps = {
  comment: CommentData
  answeredTo: boolean
  pageId: number
  restUrl: string
  setParentId: (id: number) => void
  allowComments: boolean
  user?: User
}

function Comment(props: CommentProps) {
  function responseClick(e) {
    e.preventDefault()
    props.setParentId(props.comment.id)
  }

  const comment = props.comment
  const dateCreated = new Date(comment.date_gmt)
  const commentId = `comment-${comment.id}`

  return (
    <li id={commentId} className="comment">
      <article className="comment-body">
        <header className="comment-header">
          <img
            className="comment-avatar"
            src={comment.author_avatar_urls[48]}
            srcSet={`${comment.author_avatar_urls[96]} 2x`}
            width="48"
            height="48"
            alt="Comment avatar"
          />
          <div className="comment-meta">
            <b>{comment.author_name}</b>
            <p>
              <time dateTime={comment.date_gmt}>
                {dateCreated.toLocaleString()}
              </time>
            </p>
          </div>
        </header>
        <div
          className="comment-content"
          dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
        />
        {props.allowComments ? (
          <ResponseLink onClick={responseClick} commentId={commentId} />
        ) : null}
      </article>
      {props.answeredTo ? (
        <CreateComment
          allowComments={props.allowComments}
          pageId={props.pageId}
          parentId={comment.id}
          setParentId={props.setParentId}
          restUrl={props.restUrl}
          user={props.user}
        />
      ) : null}
    </li>
  )
}
// dangerouslySetInnerHTML={{ __html: props.comment.content.rendered }}
export default Comment
