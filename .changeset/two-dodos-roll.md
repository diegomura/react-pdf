---
"@react-pdf/renderer": patch
---

### updates for `usePDF` hook

`update` function takes the new document and renders it:

```js
const PdfView = () => {
  cosnt [pdf, update] = usePdf();
  
  useEffect(() => {
    update(<PDFDocument />)
  }, [])
  
  if (pdf.loading) return null
  
  // use your PDF here
  return <>{pdf.url}</>
}
```
