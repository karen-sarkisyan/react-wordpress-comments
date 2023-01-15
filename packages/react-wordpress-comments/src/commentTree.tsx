import * as React from "react"
import Comment from "./comment"

import { CommentData, User } from "./typings"

export default function CommentTree(
  topElements: CommentData[],
  childrenElements: Array<Array<CommentData>>,
  maxDepth: number | undefined = 0,
  depth: number,
  parentId: number,
  pageId: number,
  restUrl: string,
  setParentId: (id: number) => void,
  allowComments: boolean,
  user?: User
): React.ReactElement {
  // see function body below
  return buildTree(topElements, childrenElements, depth)

  //nested recursive function to build the tree
  function buildTree(
    topElements: CommentData[],
    childrenElements: Array<Array<CommentData>>,
    depth: number
  ) {
    return (
      <>
        {topElements.map(element => {
          let id = element.id
          let hasChildren = typeof childrenElements[id] !== "undefined"
          let answeredTo = parentId === id

          // Composing comment component to use within recursive function
          function CurrentComment() {
            return (
              <Comment
                key={id}
                comment={element}
                answeredTo={answeredTo}
                pageId={pageId}
                restUrl={restUrl}
                setParentId={setParentId}
                allowComments={allowComments}
                user={user}
              />
            )
          }

          // if component has children and depth was not met, dig deeper
          if (hasChildren && (maxDepth == 0 || maxDepth > depth + 1)) {
            return (
              <React.Fragment key={id}>
                {CurrentComment()}
                <ol className="comment-children">
                  {buildTree(childrenElements[id], childrenElements, depth + 1)}
                </ol>
              </React.Fragment>
            )
            // if still has children, but depth was met, stay on the same level
          } else if (hasChildren && maxDepth <= depth + 1) {
            return (
              <React.Fragment key={id}>
                {CurrentComment()}
                {buildTree(childrenElements[id], childrenElements, depth)}
              </React.Fragment>
            )
            // if no children, return current comment
          } else {
            return CurrentComment()
          }
        })}
      </>
    )
  }
}
