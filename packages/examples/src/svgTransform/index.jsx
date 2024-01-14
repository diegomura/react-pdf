import React from 'react'
import { Document, Page, Svg, G, Rect } from '@react-pdf/renderer'

const App = () => {
  return (
    <Document>
      <Page>
        <Svg width="600" height="300">
          <G style={{ transform: 'translate(50, 50)' }}>
            <Rect fill="red" width="200" height="50" />
          </G>
        </Svg>
      </Page>
    </Document>
  )
}

export default App
