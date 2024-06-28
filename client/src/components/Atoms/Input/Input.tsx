import './Input.css';

interface InputProps {
    type: string;
    loading?: boolean;
    setValue: (value: string) => void;
    value: string;
}

export function Input({ type, loading, setValue, value }: InputProps) {
    return (
        <div className="text-input">
            <input type={type} disabled={loading} onChange={(e) => setValue(e.target.value)} value={value} className="input-text" />
        </div>
    );
}