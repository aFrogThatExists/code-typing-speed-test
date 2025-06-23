
export default function TextDisplay({ text, correct, wrong }) {
    return (
        <div className=" m-2 p-3 border border-gray-900 rounded-sm">
            {
                
                text.split("").map((char, index) => {

                    char = char.replace(" ", "\xa0")

                    if (index < (correct)) return <span key={index} className="font-bold">{char == "\n" ? <br /> : char}</span>
                    else if (index < (correct + wrong)) return <span key={index} className="text-red-700 font-bold bg-orange-300">{char == "\n" ? <>↵<br /></> : char}</span>
                    else return <span key={index}>{char == "\n" ? <br /> : char}</span>
                })
            }
        </div>
    )
}