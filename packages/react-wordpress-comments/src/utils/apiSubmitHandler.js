export default function apiSubmitHandler(response) {
  if (response.message) {
    return response.message
  } else {
    // @todo Must be a translatable string
    return "Your comment has been submitted!"
  }
}
