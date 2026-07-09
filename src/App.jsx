
import { useState } from "react";

const blocs = [
  {
    id: "amour",
    label: "C'est juste de l'amour",
    emoji: "🌸",
    couleurFond: "#fdf0f5",
    couleurAccent: "#c9536a",
    couleurBarre: "#e8a0b0",
    description: "Connexion & complicité",
    cartes: [
      { num: "01", texte: "Si j'étais célibataire et que tu devais rédiger ma fiche de présentation dans une application de rencontre, qu'écrirais-tu ?" },
      { num: "02", texte: "Si notre relation était une chanson, laquelle serait-elle et pourquoi te fait-elle penser à nous ?" },
      { num: "03", texte: "Nomme-moi 3 activités qui me passionnent. Laquelle oserais-tu pratiquer avec moi ?" },
      { num: "04", texte: "Que crois-tu qu'on est capables d'accomplir ensemble en…\nA) 6 mois ?\nB) 1 an ?\nC) 5 ans ?" },
      { num: "05", texte: "À partir de quel moment crois-tu que nous sommes devenus officiellement un couple ?" },
      { num: "06", texte: "Si tu devais décrire notre relation à quelqu'un qui ne nous connaît pas, en 3 mots seulement, lesquels utiliserais-tu ?" },
      { num: "07", texte: "Si je voulais vraiment te faire sentir aimé·e, lequel de ces gestes toucherait le plus ton cœur ?\nA) Te dire à quel point tu comptes pour moi\nB) Passer une soirée juste nous deux, sans distraction\nC) Te surprendre avec un petit cadeau qui prouve que je pense à toi\nD) Faire quelque chose pour toi sans que tu aies à me le demander\nE) Te prendre dans mes bras ou te tenir la main" },
      { num: "08", texte: "Si tu pouvais conserver un seul souvenir de nous pour toujours, lequel choisirais-tu ?" },
      { num: "09", texte: "Quel genre de vieux couple aimerais-tu que l'on devienne ?" },
      { num: "10", texte: "Qu'est-ce qui nous ferait du bien de revivre puisque nous ne l'avons pas fait depuis longtemps ?" },
      { num: "11", texte: "Nomme une activité weird qu'on n'a jamais faite ensemble et que tu as secrètement le goût qu'on l'essaie." },
      { num: "12", texte: "Qu'est-ce qui t'a attiré chez moi ?" },
      { num: "13", texte: "Qu'est-ce que je fais qui sonne comme un « je t'aime » à tes oreilles, sans que j'aie besoin de le dire ?" },
    ]
  },
  {
    id: "omg",
    label: "OMG !",
    emoji: "💬",
    couleurFond: "#edf8f7",
    couleurAccent: "#2e8b87",
    couleurBarre: "#7ec8c4",
    description: "Ce que personne n'ose dire",
    cartes: [
      { num: "14", texte: "Les jouets pour toi, c'est à utiliser :\nA) Seul(e)\nB) En couple\nC) Quand tu es mal pris(e)\nD) En cachette 🤫" },
      { num: "15", texte: "Combien de fois, selon toi, fait-on l'amour par semaine ?" },
      { num: "16", texte: "En plein souper romantique, tu vois quelqu'un draguer ton/ta partenaire. Tu es du genre :\nA) À t'intégrer dans la conversation comme si c'était normal\nB) À rappeler que c'est un souper d'amoureux et que cette personne n'est pas la bienvenue\nC) À péter ta coche dès que vous revenez à la maison\nD) À être flatté(e) que l'autre suscite autant d'intérêt et que malgré tout, il/elle te choisit" },
      { num: "17", texte: "Quelle serait selon toi la meilleure façon de répartir les dépenses dans un couple ?\nA) Tu paies tout\nB) 50/50\nC) Au prorata des salaires\nD) Chacun a des dépenses attitrées (par exemple, l'hypothèque pour moi et les assurances pour toi)" },
      { num: "18", texte: "Lesquels de ces éléments juges-tu comme de l'infidélité ?\nA) Sortir aux danseuses ou aux danseurs nus\nB) Écouter de la porno et se masturber en cachette\nC) Embrasser quelqu'un d'autre sur les lèvres\nD) Danser ou se coller avec une autre personne\nE) Avoir une relation sexuelle avec pénétration avec quelqu'un d'autre\nF) Faire des sorties avec quelqu'un sans que tu sois là" },
      { num: "19", texte: "Le sexe anal, c'est…\nA) NON !!!\nB) Juste de l'ordre d'un fantasme\nC) Excitant\nD) Parfois salissant\nE) Plus jamais" },
      { num: "20", texte: "Selon toi, qui dans notre couple devrait payer pour les préservatifs et les moyens de contraception (pilules, stérilet, injection, etc.) ?" },
      { num: "21", texte: "Pourquoi, selon toi, les gens font-ils semblant d'avoir un orgasme ? Donne-moi une bonne raison." },
      { num: "22", texte: "Nomme-moi 3 choses qui te passent le plus souvent par la tête pendant l'acte." },
      { num: "23", texte: "Les poils corporels de l'autre :\nA) C'est naturel et normal\nB) Plus il y en a, mieux c'est\nC) Ça m'écœure" },
      { num: "24", texte: "Tu as envie de moi, mais ton corps ne veut pas suivre (sécheresse, douleur, pas d'érection, rien qui marche). Que fais-tu ?" },
      { num: "25", texte: "Qu'est-ce que tu trouves le moins pire ?\nA) La transpiration\nB) L'odeur vaginale ou du pénis\nC) Les pets\nD) Les pieds qui puent" },
      { num: "26", texte: "Après combien de temps en couple est-ce permis de péter devant l'autre ?" },
    ]
  },
  {
    id: "temperature",
    label: "Montons la température !",
    emoji: "🌶️",
    couleurFond: "#fff4f0",
    couleurAccent: "#c44040",
    couleurBarre: "#e08080",
    description: "Cruise & séduction",
    cartes: [
      { num: "27", texte: "Quel est le compliment que je te fais qui te fait sentir plus sexy ?" },
      { num: "28", texte: "Si je devais te séduire avec un seul texto, tu voudrais lire quoi ?" },
      { num: "29", texte: "Sois honnête ! Qu'est-ce que tu as remarqué en premier chez moi, mes yeux ou mes fesses ?" },
      { num: "30", texte: "Laquelle de ces catégories te décrit le mieux ?\nA) Voyeuriste\nB) Exhibitionniste\nC) Pudique\nD) Dominant(e)\nE) Soumis(e)\nF) Aventurier(ère)" },
      { num: "31", texte: "Qu'est-ce qui t'allume le plus ?\nA) Les vidéos pornographiques\nB) La littérature érotique\nC) Les photos coquines\nD) Rien de tout ça, c'est toi qui m'allumes 😉" },
      { num: "32", texte: "Quels sont le meilleur moment et le meilleur endroit pour une petite vite à la maison ?" },
      { num: "33", texte: "Quelle est la chanson que tu utiliserais pour un strip-tease ?" },
      { num: "34", texte: "Quelle est la meilleure chanson pour faire l'amour ?" },
      { num: "35", texte: "Si tu n'avais le droit qu'à un seul choix de ma part pour le reste de ta vie, ce serait lequel ?\nA) Sexto\nB) Photo coquine\nC) Appel érotique" },
      { num: "36", texte: "Quel habillement t'allume le plus quand tu me regardes ?\nA) Complètement nu(e)\nB) De la lingerie\nC) Un vêtement provocateur\nD) Habillé(e) normalement — le mystère" },
      { num: "37", texte: "Quelles sont tes zones érogènes qui te procurent le plus d'effets ?\nA) Le cou\nB) Les oreilles\nC) Les pieds" },
      { num: "38", texte: "Pendant l'acte, tu aimes mieux ?\nA) Mener\nB) Être soumis(e)\nC) On partage la tâche" },
      { num: "39", texte: "Si tu devais choisir un seul style pour vivre ta sexualité pour le reste de ta vie, lequel te ressemble le plus ?\nA) Sensoriel — musique, lumières tamisées, parfums, textures, tout est dans l'ambiance\nB) Le classique assumé — efficace, confortable, dans les pantoufles et fier·e de l'être\nC) Domination/soumission — quelqu'un prend les rênes, et c'est exactement ce que tu veux\nD) Intense et sans retenue — tu veux que ça laisse des traces, au sens figuré ou littéral" },
    ]
  },
  {
    id: "chaud",
    label: "OUUU, c'est chaud !",
    emoji: "🔥",
    couleurFond: "#eef4f4",
    couleurAccent: "#1e7a76",
    couleurBarre: "#6ab8b4",
    description: "Fantasme & érotisme",
    cartes: [
      { num: "40", texte: "Si on devait vivre un trip à trois, tu préférerais que ce soit avec un autre homme ou une autre femme ?" },
      { num: "41", texte: "Décris-moi étape par étape ce que je devrais te faire pour que tu atteignes l'orgasme de ta vie." },
      { num: "42", texte: "À quel endroit aimerais-tu qu'on refasse l'amour ?" },
      { num: "43", texte: "Dans quel endroit public aurais-tu le goût qu'on fasse l'amour sans se faire surprendre ?" },
      { num: "44", texte: "Si on tournait un film érotique juste pour nous deux, ça se passerait où et ça ressemblerait à quoi ?" },
      { num: "45", texte: "Quelle catégorie de film porno aimes-tu le mieux regarder ?\nA) Couple en action\nB) Plaisir solitaire\nC) Gai / lesbienne\nD) En groupe\nE) Tendresse et romance\nF) Sexe oral" },
      { num: "46", texte: "Dans un salon de l'érotisme, à quel endroit je risque de te croiser ?\nA) Au kiosque de lingerie\nB) Au kiosque de vibrateurs\nC) Dans la section BDSM\nD) Au show érotique" },
      { num: "47", texte: "Qu'est-ce qui t'excite le plus ?\nA) De la lingerie\nB) Une danse sexy\nC) Un massage érotique" },
      { num: "48", texte: "Es-tu plus fesses ou seins ?" },
      { num: "49", texte: "Si on jouait un jeu de rôle ce soir, tu aimerais que j'incarne quel personnage ?" },
      { num: "50", texte: "Y a-t-il quelque chose qu'on n'a jamais essayé dans l'intimité mais que tu rêves qu'on tente ?" },
      { num: "51", texte: "Dans un sex-shop avec un budget illimité, tu dois acheter un truc pour moi et un truc pour toi — tu choisis quoi ?" },
      { num: "52", texte: "Tu as déjà eu mal ou été mal à l'aise pendant qu'on faisait l'amour et tu ne m'as pas arrêté ?" },
    ]
  }
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FormaterTexte({ texte }) {
  const lignes = texte.split("\n");
  return (
    <>
      {lignes.map((ligne, i) => (
        <span key={i}>
          {ligne}
          {i < lignes.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export default function NotreMoment() {
  const [ecran, setEcran] = useState("accueil");
  const [blocIndex, setBlocIndex] = useState(null);
  const [pile, setPile] = useState([]);
  const [carte, setCarte] = useState(null);
  const [cartesVues, setCartesVues] = useState(0);
  const [visible, setVisible] = useState(true);

  const bloc = blocIndex !== null ? blocs[blocIndex] : null;

  const demarrer = (index) => {
    setBlocIndex(index);
    setPile(shuffle(blocs[index].cartes));
    setCarte(null);
    setCartesVues(0);
    setVisible(true);
    setEcran("jeu");
  };

  const pigerCarte = () => {
    setVisible(false);
    setTimeout(() => {
      setPile(prev => {
        let nouvellePile = prev.length === 0 ? shuffle(blocs[blocIndex].cartes) : prev;
        const [nouvelleCarte, ...reste] = nouvellePile;
        setCarte(nouvelleCarte);
        setPile(reste);
        return reste;
      });
      setCartesVues(v => v + 1);
      setVisible(true);
    }, 280);
  };

  const retour = () => {
    setEcran("accueil");
    setBlocIndex(null);
    setCarte(null);
  };

  // ─── ACCUEIL ───────────────────────────────────────────────
  if (ecran === "accueil") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #fff5f8 0%, #fce8ef 55%, #edf8f7 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'Georgia', Georgia, serif",
      }}>

        {/* Logo & titre */}
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: "#c9536a", fontFamily: "Georgia, serif" }}>
            S'explorons-nous
          </p>
          <h1 style={{ margin: "0 0 10px", fontSize: "clamp(36px, 9vw, 58px)", fontWeight: "400", color: "#1a1a1a", lineHeight: 1.05, letterSpacing: "-1px" }}>
            Notre moment
          </h1>
          <div style={{ width: "40px", height: "2px", background: "#c9536a", margin: "0 auto 14px" }} />
          <p style={{ margin: 0, fontSize: "15px", color: "#aaa", fontStyle: "italic" }}>
            52 cartes · 4 niveaux · Une conversation à la fois
          </p>
        </div>

        {/* Grille des blocs */}
        <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {blocs.map((b, i) => (
            <button
              key={b.id}
              onClick={() => demarrer(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "18px 22px",
                background: "white",
                border: `2px solid transparent`,
                borderLeft: `5px solid ${b.couleurAccent}`,
                borderRadius: "14px",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 2px 18px rgba(0,0,0,0.07)",
                transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = b.couleurFond;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 10px 32px ${b.couleurAccent}28`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 18px rgba(0,0,0,0.07)";
              }}
            >
              <span style={{ fontSize: "30px", flexShrink: 0 }}>{b.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: "700", fontSize: "15px", color: "#1a1a1a", marginBottom: "2px" }}>
                  {b.label}
                </div>
                <div style={{ fontSize: "12px", color: "#aaa" }}>
                  {b.description} · {b.cartes.length} cartes
                </div>
              </div>
              <span style={{ fontSize: "18px", color: b.couleurAccent, opacity: 0.6 }}>›</span>
            </button>
          ))}
        </div>

        <p style={{ marginTop: "32px", fontSize: "11px", color: "#ccc", textAlign: "center" }}>
          Les cartes sont mélangées aléatoirement à chaque partie
        </p>
      </div>
    );
  }

  // ─── JEU ───────────────────────────────────────────────────
  const progression = Math.min((cartesVues / bloc.cartes.length) * 100, 100);
  const estLongue = carte && carte.texte.length > 150;

  return (
    <div style={{
      minHeight: "100vh",
      background: bloc.couleurFond,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 20px 48px",
      fontFamily: "'Georgia', Georgia, serif",
      transition: "background 0.5s ease",
    }}>

      {/* Header */}
      <div style={{
        width: "100%", maxWidth: "500px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "20px",
      }}>
        <button
          onClick={retour}
          style={{ background: "none", border: "none", fontSize: "13px", color: "#aaa", cursor: "pointer", padding: "4px 0", fontFamily: "Georgia, serif" }}
        >
          ← Retour
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "22px", lineHeight: 1 }}>{bloc.emoji}</div>
          <div style={{ fontSize: "10px", color: bloc.couleurAccent, fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px" }}>
            {bloc.label}
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#bbb", minWidth: "44px", textAlign: "right" }}>
          {cartesVues}/{bloc.cartes.length}
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{
        width: "100%", maxWidth: "500px",
        height: "3px", background: "#e0e0e0", borderRadius: "99px",
        marginBottom: "28px", overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${progression}%`,
          background: `linear-gradient(90deg, ${bloc.couleurAccent}, ${bloc.couleurBarre})`,
          borderRadius: "99px",
          transition: "width 0.5s ease",
        }} />
      </div>

      {/* Carte */}
      <div style={{ width: "100%", maxWidth: "500px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>

        <div style={{
          background: "white",
          borderRadius: "22px",
          padding: "36px 28px",
          minHeight: "220px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxShadow: `0 10px 50px ${bloc.couleurAccent}18`,
          position: "relative",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}>
          {/* Accent haut */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "4px",
            background: `linear-gradient(90deg, ${bloc.couleurAccent}, ${bloc.couleurBarre})`,
          }} />

          {!carte ? (
            <div>
              <div style={{ fontSize: "52px", marginBottom: "16px" }}>{bloc.emoji}</div>
              <p style={{ color: "#ccc", fontSize: "16px", margin: 0, lineHeight: 1.6 }}>
                Pigez votre première carte<br />pour commencer
              </p>
            </div>
          ) : (
            <div>
              <div style={{
                fontSize: "10px", letterSpacing: "2px", color: bloc.couleurAccent,
                opacity: 0.55, marginBottom: "18px", textTransform: "uppercase",
              }}>
                Carte {carte.num}
              </div>
              <p style={{
                fontSize: estLongue ? "13.5px" : "17px",
                lineHeight: estLongue ? 1.8 : 1.85,
                color: "#1a1a1a",
                margin: 0,
                fontStyle: "italic",
                textAlign: estLongue ? "left" : "center",
              }}>
                <FormaterTexte texte={carte.texte} />
              </p>
            </div>
          )}
        </div>

        {/* Bouton piger */}
        <button
          onClick={pigerCarte}
          style={{
            width: "100%",
            padding: "19px",
            background: bloc.couleurAccent,
            color: "white",
            border: "none",
            borderRadius: "14px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "Georgia, serif",
            boxShadow: `0 6px 28px ${bloc.couleurAccent}44`,
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 10px 36px ${bloc.couleurAccent}55`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 6px 28px ${bloc.couleurAccent}44`;
          }}
        >
          🎴 {carte ? "Piger une autre carte" : "Piger une carte"}
        </button>

        {/* Navigation rapide entre blocs */}
        <div style={{ display: "flex", gap: "8px" }}>
          {blocs.map((b, i) => (
            <button
              key={b.id}
              onClick={() => demarrer(i)}
              title={b.label}
              style={{
                flex: 1,
                padding: "10px 4px",
                background: i === blocIndex ? `${bloc.couleurAccent}18` : "white",
                border: `1.5px solid ${i === blocIndex ? bloc.couleurAccent : "#e8e8e8"}`,
                borderRadius: "10px",
                fontSize: "22px",
                cursor: "pointer",
                transition: "all 0.18s",
                boxShadow: i === blocIndex ? `0 2px 10px ${bloc.couleurAccent}22` : "none",
              }}
            >
              {b.emoji}
            </button>
          ))}
        </div>

        {/* CTA après 3 cartes */}
        {cartesVues >= 3 && (
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "18px 20px",
            textAlign: "center",
            boxShadow: "0 2px 18px rgba(0,0,0,0.06)",
            animation: "fadein 0.5s ease",
          }}>
            <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#888", lineHeight: 1.6 }}>
              Vous aimez jouer? 🎴<br />
              Procurez-vous <strong style={{ color: "#1a1a1a" }}>Notre moment</strong> — le jeu physique complet
            </p>
            <a
              href="#"
              style={{
                display: "inline-block",
                padding: "10px 28px",
                background: "#c9536a",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Georgia, serif",
                transition: "opacity 0.18s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Commander — 27 $
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
