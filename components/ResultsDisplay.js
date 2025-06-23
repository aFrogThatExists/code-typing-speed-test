
export default function ResultsDisplay({time, wpm, accuracy}) {
    return (
        <div className=" m-2 p-3 border border-gray-900 rounded-sm flex flex-row justify-center items-center">
            <div className="m-2 p-3 border border-gray-900 rounded-sm">TIME: {time}</div>
            <div className="m-2 p-3 border border-gray-900 rounded-sm">WPM: {wpm}</div>
            <div className="m-2 p-3 border border-gray-900 rounded-sm">ACCURACY: {accuracy}</div>
        </div>
    )
}