const TelegramIcon = ({
    size = undefined as number | undefined,
    color = '#000000',
    strokeWidth = 1,
    background = 'transparent',
    opacity = 1,
    rotation = 0,
    shadow = 0,
    flipHorizontal = false,
    flipVertical = false,
    padding = 0
}) => {
    const transforms = [];
    if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
    if (flipHorizontal) transforms.push('scaleX(-1)');
    if (flipVertical) transforms.push('scaleY(-1)');

    const viewBoxSize = 24 + (padding * 2);
    const viewBoxOffset = -padding;
    const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            width={size}
            height={size}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:text-primary"
            style={{
                opacity,
                transform: transforms.join(' ') || undefined,
                filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
                backgroundColor: background !== 'transparent' ? background : undefined
            }}
        >
            <path fill="currentColor" d="M12.077 2.001a10 10 0 0 1 7.077 3.014A10 10 0 0 1 22 12.167c-.678 13.192-19.556 13.08-20-.155a9.95 9.95 0 0 1 2.936-7.127a9.93 9.93 0 0 1 7.141-2.884m1.818 8.376s.016.01-.107.166a5 5 0 0 1-.489.512l-2.544 2.47c-.544.544-.533.878.1 1.334c.811.578 1.633 1.112 2.467 1.68c.833.567 1.855 1.4 2.278.177q.161-.49.244-1c.178-.98.356-1.958.511-2.948c.211-1.39.411-2.78.589-4.182c.089-.69-.278-1.001-.967-.834a5.6 5.6 0 0 0-.833.266l-7.256 3.06c-.688.288-1.377.6-2.055.934c-.167.088-.378.333-.367.5s.245.356.434.434c.466.189.966.322 1.455.478a2.38 2.38 0 0 0 2.222-.367a78 78 0 0 1 2.811-1.913c.445-.3.756-.467 1.19-.768c.222-.11.272-.162.317-.095z" />
        </svg>
    );
};

export default TelegramIcon;