import React from "react"
import Loader from "./loader"

export default function SubmitButton(props) {
  if (props.submitting) {
    return (
      <div className="comment-submit">
        <button>Submit</button>
        <Loader />
      </div>
    )
  } else {
    return (
      <div className="comment-submit">
        <button>Submit</button>
      </div>
    )
  }
}
