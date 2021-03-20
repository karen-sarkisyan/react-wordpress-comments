import React from "react"
import { render } from "react-dom"

import WpComments from "../../src"
import "../../css/styles.css"
import Form from "./form"
import "./demo-styles.css"

function Demo() {
  const [state, setState] = React.useState({
    maxDepth: 3,
    pageId: 2,
    hostUrl: "https://wpsite.locarb.io",
    allowComments: true,
  })

  return (
    <div className="content">
      <header className="site-header">
        <h1 className="site-branding">
          Interactive demo of{" "}
          <a
            href="https://github.com/karen-sarkisyan/react-wordpress-comments"
            target="_blank"
            rel="noreferrer"
          >
            react-wordpress-comments
          </a>
        </h1>
      </header>
      <div className="page entry-content">
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
          won&apos;t allow fetching data from this page. Re-fetching only
          happens when you change hostUrl or pageId prop values
        </p>
        <p>
          The react-wordpress-comments component is rendered below the
          horizontal line
        </p>
      </div>
      <hr />
      <hr />
      <div className="default-max-width">
        <WpComments
          maxDepth={state.maxDepth}
          pageId={state.pageId}
          hostUrl={state.hostUrl}
          allowComments={state.allowComments}
          user={null}
        />
      </div>
    </div>
  )
}

render(<Demo />, document.querySelector("#demo"))
