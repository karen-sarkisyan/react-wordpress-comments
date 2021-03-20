import React from "react"

export default function Form(props) {
  function submitHandler(e) {
    e.preventDefault()

    props.setState({
      maxDepth: e.target.maxdepth.value,
      pageId: e.target.pageid.value,
      hostUrl: e.target.hosturl.value,
      allowComments: !!e.target.allowcomments.checked,
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <p>{`<WpComments`}</p>
      <div style={{ paddingLeft: "20px" }}>
        <label>
          {"maxDepth = {"}
          <input
            type="number"
            min="0"
            max="10"
            step="1"
            name="maxdepth"
            defaultValue={3}
            required
          ></input>
          {"}"}
        </label>
        <br />
        <label>
          {"pageId = {"}
          <input type="number" name="pageid" defaultValue={2} required></input>
          {"}"}
        </label>
        <label>
          <br />
          {'hostUrl = {"'}
          <input
            type="url"
            name="hosturl"
            defaultValue="https://wpsite.locarb.io"
            required
          ></input>
          {'"}'}
        </label>
        <br />
        <label>
          {"allowComments = {"}
          <input type="checkbox" name="allowcomments" defaultChecked></input>
          {"}"}
        </label>
        <br />
      </div>
      <p>{`/>`}</p>
      <button style={{ marginTop: "10px" }}>Re-render below ⟲</button>
    </form>
  )
}
