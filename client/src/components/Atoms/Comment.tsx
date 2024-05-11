import "./Comment.css";

interface CommentProps {
    setValue: (value: string) => void;
    value: string;
}

export function Comment({ setValue, value }: CommentProps) {
    return (
        <div className="text-input">
            <textarea onChange={(e) => setValue(e.target.value)} value={value} ></textarea>
        </div>
    );
}