// GlobalEventsPlugin.tsx
import { useLayoutEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalCommand, createCommand } from 'lexical'
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  INDENT_CONTENT_COMMAND,
  COMMAND_PRIORITY_HIGH
} from "lexical";
export const SAVE_COMMAND: LexicalCommand<KeyboardEvent> = createCommand('SAVE_COMMAND')

const GlobalEventsPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useLayoutEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // "Ctrl" or "Cmd" + "s"
      if ((event.ctrlKey || event.metaKey) && event.which === 83) {
        editor.dispatchCommand(SAVE_COMMAND, event)
      }
    }

    return editor.registerRootListener((rootElement: HTMLElement | null, prevRootElement: HTMLElement | null) => {
      if (prevRootElement !== null) {
        prevRootElement.removeEventListener('keydown', onKeyDown)
      }
      if (rootElement !== null) {
        rootElement.addEventListener('keydown', onKeyDown)
      }
    })
  }, [editor])

  return null
}

export default function SendKeyPlugin() {
  const [editor] = useLexicalComposerContext();

    editor.registerCommand(
    SAVE_COMMAND,
    (event: any) => {
            console.log(event);
        // Do something with `event`, e.g. `event.preventDefault() && saveData()`
        return true;
    },
    COMMAND_PRIORITY_HIGH,
    );
    return null;
}
