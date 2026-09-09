# Reproducing #3449 — content overlapping itself at a page break

This document shows how to reproduce, by hand, the pagination bug fixed in this
branch: a block that lands near the bottom of a page is **squashed into the few
points of space left** — its lines drawn on top of each other — instead of
moving cleanly to the next page.

- **Affected package:** `@react-pdf/layout` (the pagination step). It is what
  `@react-pdf/renderer` uses to break a document into pages, so the bug shows up
  through the renderer even though the renderer version number looks unrelated
  (e.g. renderer `4.5.1` depends on layout `4.6.1`).
- **Still present on the latest published version** (layout `4.6.1`).

## Quick reproduction (react-pdf REPL)

1. Open <https://react-pdf.org/repl>.
2. Replace the editor contents with the snippet below.
3. Look at the **bottom of page 1**.

```jsx
const Block = ({ label, value }) => (
  <View style={{ marginTop: 5 }} wrap={false}>
    <Text style={{ fontSize: 8, fontWeight: 700 }}>{label}</Text>
    <Text style={{ fontSize: 8 }}>{value}</Text>
  </View>
);

const Entry = ({ time, title, a, w, p }) => (
  <View>
    <View style={{ flexDirection: "row", borderBottomWidth: 1, paddingVertical: 8 }} wrap={false}>
      <View style={{ width: 130, marginLeft: 20 }}>
        <Text style={{ fontSize: 11, marginBottom: 5 }}>{time}</Text>
        <Text style={{ fontSize: 7 }}>PENDING</Text>
      </View>
      <View style={{ flex: 1, marginRight: 20 }}>
        <Text style={{ fontSize: 10 }}>{title}</Text>
        <Text style={{ fontSize: 8, marginTop: 5 }}>2 Adults</Text>
        <Block label="Address" value={a} />
        <Block label="Website" value={w} />
        <Block label="Phone" value={p} />
      </View>
    </View>
  </View>
);

const Doc = () => (
  <Document>
    <Page size="A4" style={{ paddingTop: 40, paddingBottom: 90, paddingHorizontal: 40, flexDirection: "column" }}>
      <View fixed>
        <Text style={{ fontSize: 22 }}>Daily Itinerary</Text>
      </View>
      <View style={{ flex: 1 }}>
        {/* spacer: pushes the 2nd entry to the bottom of page 1 */}
        <View style={{ height: 500 }} />
        <View>
          <View minPresenceAhead={100}>
            <View style={{ marginTop: 10, marginBottom: 8 }}>
              <Text style={{ fontSize: 9, fontWeight: 700 }}>TUESDAY, APR 7</Text>
            </View>
            <Entry time="12:25 AM" title="Juvia"
              a="1111 Lincoln Road, Miami Beach, Florida, 33139"
              w="http://www.juviamiami.com/" p="+1 305-763-8272" />
          </View>
          <View>
            <Entry time="01:05 AM" title="Miami Beach Golf Club"
              a="2301 Alton Road, Miami Beach, Florida, 33140"
              w="http://www.miamibeachgolfclub.com/" p="+1 305-532-3350" />
          </View>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0, left: 40, right: 40, height: 50 }} fixed>
        <Text style={{ fontSize: 8 }}>EXCLUSIVE RESORTS</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<Doc />);
```

### What you should see (the bug)

At the bottom of page 1, the **"01:05 AM / Miami Beach Golf Club"** entry is
crammed into the sliver of space left:

- `Address` is drawn on top of `2301 Alton Road, …`
- `Website` is drawn on top of the URL
- `Phone` is drawn on top of the phone number

i.e. every field of that entry overlaps the next. With the fix, the entry moves
to page 2 intact and page 1 ends cleanly after the "Juvia" entry.

### Important: the trigger is position-sensitive

The overlap only happens when the second entry lands with **just barely not
enough** room — enough to *start* on the page but not enough to fit. The exact
`height` that lands it there depends on font metrics, which differ slightly
between the in-browser REPL and a server render. The verified window is roughly
**`height: 490`–`510`**. If `500` renders cleanly for you, try `490` or `510`.

## Why it happens (root cause)

In `packages/layout/src/steps/resolvePagination.ts`, `splitNodes` decides what
to do when a node is split and **all** of its children move to the next page
(leaving an empty shell on the current page):

```js
if (child.children.length > 0 && currentChild.children.length === 0) {
  // "if the current page is empty, keep the parent here"
  if (currentChildren.length === 0) {
    currentChildren.push(child, ...futureFixedNodes); // kept on the current page
  } else {
    // move it to the next page
  }
}
```

The intent of `currentChildren.length === 0` is *"the page is empty, so keeping
this node here (even if it overflows) is better than producing an empty page /
looping forever."* But `currentChildren` is the **local** list for the node's
own container — it is `0` simply because the node is the **first child of its
container**, which is not the same as the page being empty.

In the snippet above the golf entry is the only child of its (sibling)
container, yet the page already holds the "Juvia" entry. The check misfires,
the whole entry is force-kept in the tiny remaining space, and Yoga compresses
its lines on top of each other.

## The fix

Base the keep-vs-move decision on whether the page is actually **empty above
the node**, threaded through the split recursion (`pageEmpty`):

- Page already has content above → **move** the node to the next page.
- Page genuinely empty and the node cannot fit → keep it (and let it overflow),
  which is what preserves termination and prevents an infinite page loop.

See `packages/layout/src/steps/resolvePagination.ts` and the regression tests in
`packages/layout/tests/steps/resolvePagination.test.ts` (overlap sweep across
page heights + a tall-fixed-header loop guard).
