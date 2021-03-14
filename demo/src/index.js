import React, { Component } from "react"
import { render } from "react-dom"

import WpComments from "../../src"
import "../../src/styles.css"

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-wordpress-comments Demo</h1>
        <WpComments
          maxDepth={3}
          pageId={619}
          hostUrl="http://localhost:8888/localsite_new3"
          allowComments={true}
          user={null}
        />
      </div>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
