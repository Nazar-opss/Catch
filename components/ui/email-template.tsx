type EmailTemplateProps = {
    url: string;
}

export function EmailTemplate({ url }: EmailTemplateProps) {
    return (
        <div style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "6px" }}>
            <p>Привіт!</p>
            <p>Ви запросили скидання паролю. Натисніть на кнопку нижче, щоб скинути пароль.</p>
            <a href={url} style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", display: "inline-block" }}>Скинути пароль</a>
            <p>Якщо ви не запрошували скидання паролю, ігноруйте цей лист.</p>
            <p>З повагою, команда Catch</p>
        </div>
    )
}
