import { Translations } from "../typings"

type DefaultTranslations = Required<Translations>

export const defaultTranslations: DefaultTranslations = {
  mainHeading: "Comments section",
  leaveCommentHeading: "Leave comment",
  loadingCommentsLabel: "Loading comments...",
  loggedInUserIntro: "You are logged in as ",
  respondLinkLabel: "Respond ↓",
  nameInputLabel: "Name*:",
  emailInputLabel: "Email*:",
  commentInputLabel: "Write your comment:",
  commentInputPlaceholder: "Your comment here...",
  submitButtonLabel: "Submit",
  cancelLinkLabel: "Cancel X",
  commentsClosedNotice: "Comments are closed",
}
