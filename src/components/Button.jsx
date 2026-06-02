
export const Button1 = ({ text, icon }) => {
    return (
        <>
        <button className="type-1">
            <div className="button-wrapper">
                <div className="text">{text}</div>
                <span className="icon">
                    <i className={`bi ${icon}`}></i>
                </span>
            </div>
        </button>
        </>
    )
}