interface Iprop {
    value?: number;
}

const ScontoComponent = ({ value }: Iprop) => {
    const scontoApplicato = (value: number) => {
        switch (true) {
            case value > 300:
                return "$" + (value - 50);
            case value > 200:
                return "$" + (value - 30);
            case value > 150:
                return "$" + (value - 25);
            case value > 100:
                return "$" + (value - 20);
            case value >= 50:
                return "$" + (value - 15);
            case value < 50 && value > 20:
                return "$" + (value - 5);
            default:
                return "$" + (value - 3);
        }
    };

    return (
        <div className="inline-block relative">
            {!value ? null : <span className="lineStyle">{value}</span>}
            <div className="inline-block ms-2 text-red-500">{value && scontoApplicato(value)} </div>
        </div>
    );
};

export default ScontoComponent;
