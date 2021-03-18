import React from "react"
import { render } from "react-dom"

import WpComments from "../../src"
import "../../css/styles.css"
import Form from "./form"

function Demo() {
  const [state, setState] = React.useState({
    maxDepth: 3,
    pageId: 2,
    hostUrl: "https://wpsite.locarb.io",
    allowComments: true,
  })

  return (
    <div>
      <h1>
        This is a demo of{" "}
        <a
          href="https://github.com/karen-sarkisyan/react-wordpress-comments"
          target="_blank"
          rel="noreferrer"
        >
          react-wordpress-comments
        </a>
      </h1>
      <p>
        You can see it working with a{" "}
        <a
          href="https://wpsite.locarb.io/sample-page"
          target="_blank"
          rel="noreferrer"
        >
          demo WP endpoint
        </a>
        , or use your own!
      </p>
      <p>
        Play with the component below by passing the props just like you would
        in your actual project.
      </p>
      <hr />
      <Form setState={setState} />
      <hr />
      <p>
        Note: you need to use https protocol in URL, otherwise your browser
        won&apos;t allow fetching data from this page. Re-fetching only happens
        when you change hostUrl or pageId prop values
      </p>
      <p>
        The react-wordpress-comments component is rendered below the horizontal
        line
      </p>
      <hr />
      <hr />
      <WpComments
        maxDepth={state.maxDepth}
        pageId={state.pageId}
        hostUrl={state.hostUrl}
        allowComments={state.allowComments}
        user={null}
      />
    </div>
  )
}

render(<Demo />, document.querySelector("#demo"))
