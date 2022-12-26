import * as React from "react"
import Loader from "./loader"

type SubmitButtonProps = {
  isSubmitting: boolean
}

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  if (isSubmitting) {
    return (
      <div className="comment-submit">
        <button disabled>Submit</button>
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
