---
'@react-pdf/renderer': patch
---

Added an optional callback to the updateContainer method. This allows the user of the pdf instance to know when the update operation is finished in React. As this is an optional argument, no user code should be changed.
