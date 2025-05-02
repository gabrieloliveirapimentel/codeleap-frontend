interface DeletePostFormProps {
  onClose: (state: boolean) => void;
  onDelete: () => void;
}

export function DeletePostForm({ onClose, onDelete }: DeletePostFormProps) {
  return (
    <div className="flex justify-end gap-3">
      <button
        onClick={(prev) => {
          onClose(!prev);
        }}
        className="mt-2 text-black cursor-pointer border-[1px] border-black"
      >
        Cancel
      </button>

      <button
        className="mt-2 text-white cursor-pointer  bg-red-400 hover:bg-red-600"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}
