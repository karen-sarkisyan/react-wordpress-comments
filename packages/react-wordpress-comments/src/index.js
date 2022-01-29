import React, { useEffect, useState } from "react"
import CreateComment from "./createComment"
import CommentTree from "./commentTree"
import separateParentsChildren from "./utils/separateParentsChildren"

function WpComments({ hostUrl, maxDepth, pageId, allowComments, user }) {
  // main comment tree state
  const [state, setState] = useState({
    topElements: null,
    childrenElements: null,
    commentsNumber: 0,
    isFetching: true,
    parentId: 0,
  })

  //Handler function to be passed down the tree. It updates state with id of a comment user replies to
  function setParentId(id) {
    setState(prevState => ({ ...prevState, parentId: id }))
  }

  let restUrl = `${hostUrl}/wp-json/wp/v2/comments`

  // Fetch comments upon mounting to the DOM
  useEffect(() => {
    //constructing URL as suggested in fetch spec: https://fetch.spec.whatwg.org/#fetch-api
    const url = new URL(`${hostUrl}/wp-json/wp/v2/comments`),
      params = { post: pageId, per_page: 100 }
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    )

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => (response.ok ? response.json() : null))
      .then(resultData => {
        const commentsNumber = resultData.length

        const [topElements, childrenElements] =
          separateParentsChildren(resultData)
        setState({
          topElements,
          childrenElements,
          commentsNumber,
          isFetching: false,
          parentId: 0,
        })
      })
      .catch(err => {
        console.error(err) // well, yeah, for now
      })
  }, [hostUrl, pageId])

  if (state.isFetching) {
    return <p>Loading comments...</p>
  } else {
    return (
      <div className="comments-area">
        <div className="comments-title">
          <h2>Comments section ({state.commentsNumber})</h2>
        </div>
        <div>
          <ol className="comment-list">
            {CommentTree(
              state.topElements,
              state.childrenElements,
              maxDepth,
              0,
              state.parentId,
              pageId,
              restUrl,
              setParentId,
              allowComments,
              user
            )}
          </ol>
          {state.parentId === 0 ? (
            <CreateComment
              allowComments={allowComments}
              pageId={pageId}
              parentId={0}
              restUrl={`${hostUrl}/wp-json/wp/v2/comments`}
              user={user}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default WpComments
