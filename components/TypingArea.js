
export default function TypingArea({ text, setText, addWrong }) {
    return (
        <textarea type="text" className="m-2 p-3 border border-gray-900 rounded-sm w-10/12 md:w-1/2 h-96" value={text}
            onChange={(e) => { setText(e.target.value) }} onKeyDown={(e) => { if (e.key == "Backspace" || e.key == "Delete") addWrong() }}
        />
    )
}       