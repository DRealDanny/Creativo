import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import styles from './RichTextEditor.module.css';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.toolbar}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? styles.activeBtn : styles.btn}
        type="button"
        title="Bold"
      >
        <i className="ri-bold"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? styles.activeBtn : styles.btn}
        type="button"
        title="Italic"
      >
        <i className="ri-italic"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? styles.activeBtn : styles.btn}
        type="button"
        title="Underline"
      >
        <i className="ri-underline"></i>
      </button>
      <input
        type="color"
        onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
        value={editor.getAttributes('textStyle').color || '#ffffff'}
        className={styles.colorPicker}
        data-testid="setColor"
        title="Text Color"
      />
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable headings
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
      }),
      TextStyle,
      Color,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  // Need to update content if it changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className={styles.editorContainer}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
