type Response = {
  message?: string
}

export default function apiSubmitHandler(response: Response) {
  if (response.message) {
    return response.message
  } else {
    // @todo Must be a translatable string
    return "Your comment has been submitted!"
  }
}
