import React from "react"
import { render } from "react-dom"

import WpComments from "../../src"
import "../../src/styles.css"

function Demo() {
  return (
    <div>
      <h1>react-wordpress-comments Demo</h1>
      <WpComments
        maxDepth={3}
        pageId={2}
        hostUrl="http://wordpress-for-fun.000webhostapp.com"
        allowComments={true}
        user={null}
      />
    </div>
  )
}

render(<Demo />, document.querySelector("#demo"))
