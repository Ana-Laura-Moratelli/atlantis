import MaskedInput from "react-text-mask";

interface MaskedTextFieldProps {
    name: string;
    mask: (string | RegExp)[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const MaskedTextField: React.FC<MaskedTextFieldProps> = ({
    name,
    mask,
    value,
    onChange,
    onBlur,
    placeholder,
    className,
}) => {
    return (
        <MaskedInput
            name={name}
            mask={mask}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={className}
        />
    );
};

export default MaskedTextField;
