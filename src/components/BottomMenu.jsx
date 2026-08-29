 //Renders navigation items with their icons, active state, and click actions

function BottomMenu ({ items }) {
    return (
        <nav className="bottom-menu" aria-label="main navigation">
            {items.map((item) => ( 
                <button 
                    className={item.className}
                    type="button"
                    key={item.name}
                    aria-label={item.label}
                    aria-current={item.ariaCurrent}
                    onClick={item.onSelect}
                    >
                        <img src={item.icon} />
                    </button>
            ))}
        </nav>
    );
}

export default BottomMenu;