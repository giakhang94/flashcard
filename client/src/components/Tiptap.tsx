/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
interface Props {
  id: string;
  closeForm?: () => void;
  content?: string;
}
export default function Tiptap({ id, closeForm, content }: Props) {
  const [output, setOutput] = useState("");
  const queryClient = useQueryClient();
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: content || "Nhập mô tả liên kết hack não ở đây",
    onUpdate: ({ editor }) => {
      setOutput(editor.getHTML());
    },
  });

  const handleSubmit = async () => {
    const resp = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/cards/edit/${id}`,
      { hint: output },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  };
  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      toast("Đã thêm hack não của từ này");
      queryClient.invalidateQueries({ queryKey: ["card-level"] });
      if (closeForm) {
        closeForm();
      }
    },
    onError: async (error: any) => {
      console.log(error);
      if (error.response.data.message === "Unauthorized") {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, {
          withCredentials: true,
        });
        mutation.mutate();
      } else {
        toast(error.response.data.message);
      }
    },
  });

  if (!editor) return null;

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <div className="w-full mx-auto h-full max-h-[200px] overflow-x-auto">
      <div className="border rounded-lg p-2 bg-white dark:bg-neutral-900">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive("bold")
                ? "dark:bg-neutral-600"
                : "dark:bg-neutral-800"
            } ${editor.isActive("bold") ? "bg-blue-200" : "bg-gray-100"}`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded  ${
              editor.isActive("italic")
                ? "dark:bg-neutral-600"
                : "dark:bg-neutral-800"
            } ${editor.isActive("italic") ? "bg-blue-200" : "bg-gray-100"}`}
          >
            <i>I</i>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 rounded  ${
              editor.isActive("bulletList")
                ? "dark:bg-neutral-600"
                : "dark:bg-neutral-800"
            } ${editor.isActive("bulletList") ? "bg-blue-200" : "bg-gray-100"}`}
          >
            • List
          </button>

          {/* Màu chữ */}
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
            title="Chọn màu chữ"
            className="border-none outline-none"
          />
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className=" outline-none p-2 border-none w-full"
        />
      </div>
      <button
        className="bg-neutral-800 px-3 py-[7px] rounded-sm uppercase text-sm my-3"
        onClick={() => {
          mutation.mutate();
        }}
      >
        update
      </button>
    </div>
  );
}
