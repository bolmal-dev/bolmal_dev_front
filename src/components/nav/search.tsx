export default function Search() {
    return (
        <div className="relative">
            <input
                type="text"
                className="w-[27.77vw] h-[3.7vh] rounded-[100px] bg-bg-default focus:outline-none focus:border-primary"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">🔍</button>
        </div>
    );
}
