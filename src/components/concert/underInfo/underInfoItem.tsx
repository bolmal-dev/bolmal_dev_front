export interface UnderInfoItemProps {
    label: string;
    value: string;
}

export function UnderInfoItem({ label, value }: UnderInfoItemProps) {
    return (
        <div className="flex gap-[1.38vw]">
            <span className="text-[#AEAEAE]">{label}</span>
            <span>{value}</span>
        </div>
    );
}
