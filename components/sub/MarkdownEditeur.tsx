import { Editable, Slate, withReact } from 'slate-react'
import { useState } from 'react'
import { createEditor } from 'slate'

type Props = {}

/**
 * TODO: it could be an editor supporting markdown syntax.
 * - with a toolbar
 * - with a Preview button (switch horizontally, vertically or fully)
 *
 * @param props
 * @returns
 */
const MarkdownEditeur = (props: Props) => {
  const [editor] = useState(() => withReact(createEditor()))
  return (
    <>
      <Slate
        editor={editor}
        initialValue={[
          {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph' }],
          },
        ]}
      >
        <Editable />
      </Slate>
    </>
  )
}

export default MarkdownEditeur
