import * as React from "react"

import { TranslationsContext } from "./context/translationsContext"
import SubmitButton from "./submitButton"
import apiSubmitHandler from "./utils/apiSubmitHandler"

import type { User } from "./typings"

type CreateCommentProps = {
  pageId: number
  restUrl: string
  parentId: number
  setParentId?: (id: number) => void
  allowComments: boolean
  user?: User
}

function CreateComment(props: CreateCommentProps) {
  const [submitting, setSubmitting] = React.useState(false)
  const [response, setResponse] = React.useState("")

  const translations = React.useContext(TranslationsContext)

  // This function gets executed only if native HTML form validation is passed
  function submitComment(event) {
    event.preventDefault()

    let reqHeaders: { [header: string]: string } = {
      "Content-Type": "application/json",
    }
    // if provided, add JWT auth header
    if (props.user) {
      reqHeaders.Authorization = `Bearer ${props.user.jwt}`
    }

    let payload = {
      author_name: event.target.author_name.value,
      author_email: event.target.author_email.value,
      content: event.target.comment_content.value,
      post: props.pageId,
      parent: props.parentId,
    }

    setSubmitting(true)

    fetch(props.restUrl, {
      method: "POST",
      mode: "cors",
      headers: reqHeaders,
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(result => {
        setSubmitting(false)
        setResponse(apiSubmitHandler(result))
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  function cancelResponse(e) {
    e.preventDefault()
    // set parent to 0
    props.setParentId!(0)
  }

  if (props.allowComments) {
    return (
      <div className="comment-respond">
        <h3 className="reply-title">
          {translations.leaveCommentHeading}
          {props.parentId ? (
            // if comment was selected as a response, add close button
            <small>
              <a onClick={cancelResponse} href={`#comment-${props.parentId}`}>
                {translations.cancelLinkLabel}
              </a>
            </small>
          ) : null}
        </h3>
        <form onSubmit={submitComment}>
          {props.user ? (
            // if there's a user authorized, hide inputs and inform the user
            <>
              <p>
                {translations.loggedInUserIntro}
                {props.user.name}
              </p>
              <input type="hidden" name="author_name" value={props.user.name} />
              <input
                type="hidden"
                name="author_email"
                value={props.user.email}
              />
            </>
          ) : (
            <>
              <fieldset>
                <p className="comment-input-name">
                  <label>
                    {translations.nameInputLabel}
                    <input
                      title="Name to be displayed on comment, 30 symbols max"
                      maxLength={30}
                      name="author_name"
                      required
                    />
                  </label>
                </p>
                <p className="comment-input-email">
                  <label>
                    {translations.emailInputLabel}
                    <input
                      type="email"
                      title="A valid email address of the author"
                      name="author_email"
                      required
                    />
                  </label>
                </p>
              </fieldset>
            </>
          )}

          <p className="comment-input-content">
            <label>
              {translations.commentInputLabel}
              <textarea
                placeholder={translations.commentInputPlaceholder}
                maxLength={2000}
                name="comment_content"
                rows={4}
                required
              ></textarea>
            </label>
          </p>

          <SubmitButton isSubmitting={submitting} />
          {response && <p className="comment-submit-info">{response}</p>}
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <p>{translations.commentsClosedNotice}</p>
      </div>
    )
  }
}

export default CreateComment
