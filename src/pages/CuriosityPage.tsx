import Navbar from "../components/Navbar.tsx";

function CuriosityPage() {
    return (
        <div className="app flex flex-col min-h-screen">
            <Navbar />
            <div style={outerContainerStyle}>
                <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Curiosità sulla Street Art a Napoli</h1>

                <div style={cardGridStyle}>
                    {cards.map((card, index) => (
                        <div key={index} style={cardStyle}>
                            <h2>{card.title}</h2>
                            <p>{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const outerContainerStyle = {
    maxWidth: "960px", // circa 8-10 colonne su un layout a 12 colonne
    margin: "0 auto",
    padding: "20px",
    marginTop: "20px"
};

const cardGridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center"
};

const cardStyle = {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flex: "1 1 300px",
    maxWidth: "450px"
};

// ✅ Contenuto delle card
const cards = [
    {
        title: "🌱 AirLite: la pittura che purifica l’aria",
        text: "AirLite è una pittura ecologica che trasforma gli agenti inquinanti in sali inerti, contribuendo a migliorare la qualità dell’aria. È usata in molti murales napoletani per unire arte e sostenibilità."
    },
    {
        title: "🎨 Tipi di Street Art",
        text: "La street art include murales, stencil, poster art, sticker art, installazioni, mosaici e pittura a pennello. Ogni tecnica ha un impatto visivo e sociale diverso."
    },
    {
        title: "🕵️‍♂️ Banksy e Napoli",
        text: "A Napoli si trova una delle poche opere attribuite a Banksy in Italia: la 'Madonna con la pistola'. È diventata simbolo della contraddizione tra fede e violenza."
    },
    {
        title: "🏘️ Paesi dipinti nel Casertano",
        text: "A Valogno e altri borghi del casertano, ogni muro è una tela: il paese è stato trasformato in un museo a cielo aperto grazie a decine di murales."
    },
    {
        title: "⚖️ Writer vs Amministrazioni",
        text: "La street art è spesso al centro di dibattiti: alcuni la vedono come vandalismo, altri come arte urbana. A Napoli ci sono stati casi di rimozione di opere non autorizzate."
    },
    {
        title: "🏙️ Arte per riqualificare",
        text: "Progetti come 'Street Art Napoli' hanno trasformato quartieri degradati in spazi vivi e colorati, coinvolgendo scuole, associazioni e cittadini."
    }
];

export default CuriosityPage;
