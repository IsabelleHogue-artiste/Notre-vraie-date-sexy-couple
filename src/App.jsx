import React, { useState, useRef } from "react";

/* ---------------------------------------------------------
   NOTRE MOMENT — S'explorons-nous
   Jeu de cartes numérique à piger, 52 questions, 4 blocs
--------------------------------------------------------- */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,500;1,500;1,600&family=Nunito+Sans:wght@400;600;700&display=swap');
`;

/* ---------- Icônes (fidèles au branding fourni) ---------- */

const IconHeart = ({ color }) => (
  <svg viewBox="0 0 100 100" width="46" height="46">
    <path
      d="M50 82 C 20 60, 8 42, 18 26 C 26 13, 44 14, 50 32 C 56 14, 74 13, 82 26 C 92 42, 80 60, 50 82 Z"
      fill="none"
      stroke={color}
      strokeWidth="4.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const IconChat = ({ color }) => (
  <svg viewBox="0 0 100 100" width="46" height="46">
    <path
      d="M20 28 h60 a8 8 0 0 1 8 8 v28 a8 8 0 0 1 -8 8 H46 l-14 14 v-14 H20 a8 8 0 0 1 -8 -8 V36 a8 8 0 0 1 8 -8 Z"
      fill="none"
      stroke={color}
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
    <circle cx="42" cy="50" r="3" fill={color} />
    <circle cx="54" cy="50" r="3" fill={color} />
    <circle cx="66" cy="50" r="3" fill={color} />
  </svg>
);

const IconTherm = ({ color }) => (
  <svg viewBox="0 0 100 100" width="46" height="46">
    <path
      d="M45 20 a6 6 0 0 1 12 0 v36 a14 14 0 1 1 -12 0 Z"
      fill="none"
      stroke={color}
      strokeWidth="4"
    />
    <circle cx="51" cy="70" r="7" fill={color} />
    <path d="M65 30 q6 6 0 12 q-6 6 0 12" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const IconFlame = ({ color }) => (
  <svg viewBox="0 0 100 100" width="46" height="46">
    <path
      d="M50 15 C 38 32, 30 40, 32 55 C 33 66, 42 74, 50 74 C 58 74, 67 66, 68 55 C 69 46, 63 42, 60 45 C 62 34, 56 24, 50 15 Z
         M42 58 C 42 66, 46 70, 50 70 C 54 70, 58 66, 58 58 C 58 52, 54 50, 52 53 C 51 47, 46 44, 42 50 C 40 53, 41 56, 42 58 Z"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- Données des blocs ---------- */

const BLOCS = [
  {
    id: 1,
    title: "C'est juste de l'amour",
    subtitle: "Connexion et complicité",
    icon: IconHeart,
    primary: "#B85679",
    dark: "#8A3E58",
    light: "#F5E6E9",
  },
  {
    id: 2,
    title: "Sans filtre",
    subtitle: "« Je ne peux pas croire que je vais répondre à ça! »",
    icon: IconChat,
    primary: "#2A9D8F",
    dark: "#1E7268",
    light: "#E4EFEE",
  },
  {
    id: 3,
    title: "Augmentons la température",
    subtitle: "Tu m'allumes",
    icon: IconTherm,
    primary: "#BA4776",
    dark: "#8C3357",
    light: "#F8E9F0",
  },
  {
    id: 4,
    title: "Ouuuh! C'est chaud!",
    subtitle: "Jusqu'où l'imagination peut vous amener?",
    icon: IconFlame,
    primary: "#1F8F8A",
    dark: "#166863",
    light: "#DFEEEC",
  },
];

/* ---------- Les 52 questions ---------- */

const QUESTIONS = [
  { n: 1, bloc: 1, q: "Si j'étais célibataire et que tu devais rédiger ma fiche de présentation dans une application de rencontre, qu'écrirais-tu ?" },
  { n: 2, bloc: 1, q: "Si notre relation était une chanson, laquelle serait-elle et pourquoi te fait-elle penser à nous ?" },
  { n: 3, bloc: 1, q: "Nomme-moi 3 activités qui me passionnent. Laquelle oserais-tu pratiquer avec moi ?" },
  { n: 4, bloc: 1, q: "Que crois-tu qu'on est capables d'accomplir en...", opts: ["6 mois ?", "1 an ?", "5 ans ?"] },
  { n: 5, bloc: 1, q: "À partir de quel moment, crois-tu que nous sommes devenus officiellement un couple ?" },
  { n: 6, bloc: 1, q: "Si tu devais décrire notre relation à quelqu'un qui ne nous connaît pas, en 3 mots seulement, lesquels utiliserais-tu ?" },
  { n: 7, bloc: 1, q: "Si je voulais vraiment te faire sentir aimé·e, lequel de ces gestes toucherait le plus ton cœur ?", opts: ["Te dire à quel point tu comptes pour moi", "Passer une soirée juste nous deux, sans distraction", "Te surprendre avec un petit cadeau qui prouve que je pense à toi", "Faire quelque chose pour toi sans que tu aies à me le demander", "Te prendre dans mes bras ou te tenir la main"] },
  { n: 8, bloc: 1, q: "Si tu pouvais conserver un seul souvenir de nous pour toujours, lequel choisirais-tu ?" },
  { n: 9, bloc: 1, q: "Quel genre de vieux couples aimerais-tu que l'on devienne ?" },
  { n: 10, bloc: 1, q: "Qu'est-ce qui nous ferait du bien de revivre puisque nous ne l'avons pas fait depuis longtemps ?" },
  { n: 11, bloc: 1, q: "Nomme une activité weird qu'on n'a jamais faite ensemble et que tu as secrètement le goût qu'on l'essaie." },
  { n: 12, bloc: 1, q: "Qu'est-ce qui t'a attiré chez moi ?" },
  { n: 13, bloc: 1, q: "Qu'est-ce que je fais qui sonne comme un « je t'aime » à tes oreilles, sans que j'aie besoin de le dire ?" },

  { n: 14, bloc: 2, q: "Les jouets pour toi, c'est à utiliser :", opts: ["Seul(e)", "En couple", "Quand tu es mal pris(e)", "En cachette"] },
  { n: 15, bloc: 2, q: "Combien de fois, selon toi, fait-on l'amour par semaine ?" },
  { n: 16, bloc: 2, q: "En plein souper romantique, tu vois quelqu'un draguer ton/ta partenaire. Tu es du genre :", opts: ["À t'intégrer dans la conversation comme si c'était normal", "À rappeler que c'est un souper d'amoureux et que cette personne n'est pas la bienvenue", "À pèter ta coche dès que vous revenez à la maison", "À être flatté que l'autre suscite autant d'intérêt et que malgré tout il/elle fasse le choix de te choisir"] },
  { n: 17, bloc: 2, q: "Quelle serait selon toi la meilleure façon de répartir les dépenses dans un couple ?", opts: ["Tu paies tout", "50/50", "Au prorata des salaires", "Chacun a des dépenses attitrées (ex. l'hypothèque pour moi et les assurances pour toi)"] },
  { n: 18, bloc: 2, q: "Lesquels de ces éléments juges-tu comme de l'infidélité ?", opts: ["Sortir aux danseuses ou aux danseurs nus", "Écouter de la porno et se masturber en cachette", "Embrasser quelqu'un d'autre sur les lèvres", "Danser ou se coller avec une autre personne", "Avoir une relation sexuelle avec pénétration avec quelqu'un d'autre", "Faire des sorties avec quelqu'un sans que tu sois là"] },
  { n: 19, bloc: 2, q: "Le sexe anal, c'est…", opts: ["NON !!!", "Juste de l'ordre d'un fantasme", "Excitant", "Parfois salissant", "Plus jamais"] },
  { n: 20, bloc: 2, q: "Ça t'es-tu déjà arrivé d'avoir mal ou d'être mal à l'aise en faisant l'amour pis de rien dire? Qu'est-ce qui ferait que tu te sentirais plus à l'aise de m'arrêter la prochaine fois?" },
  { n: 21, bloc: 2, q: "Pourquoi, selon toi, les gens font-ils semblant d'avoir un orgasme ? Donne-moi une bonne raison." },
  { n: 22, bloc: 2, q: "Qu'est ce qui te déconcentre le plus pendant des ébats?" },
  { n: 23, bloc: 2, q: "Les poils corporels de l'autre :", opts: ["C'est naturel et normal", "Plus il y a de poils, mieux c'est", "Ça m'écœure"] },
  { n: 24, bloc: 2, q: "Tu as envie de moi, mais ton corps ne veut pas suivre (sécheresse, douleur, pas d'érection, rien qui marche). Que fais-tu ?" },
  { n: 25, bloc: 2, q: "Qu'est-ce que tu trouves le moins pire ?", opts: ["La transpiration", "L'odeur vaginale ou du pénis", "Les pets", "Les pieds qui puent"] },
  { n: 26, bloc: 2, q: "Après combien de temps en couple est-ce permis de péter devant l'autre ?" },

  { n: 27, bloc: 3, q: "Quel est le compliment que je te fais qui te fait sentir plus sexy ?" },
  { n: 28, bloc: 3, q: "Si je devais te séduire avec un seul texto, tu voudrais lire quoi ?" },
  { n: 29, bloc: 3, q: "Sois honnête ! Qu'est-ce que tu as remarqué en premier chez moi, mes yeux ou mes fesses ?" },
  { n: 30, bloc: 3, q: "Quelle partie de mon corps te fait le plus d'effet?" },
  { n: 31, bloc: 3, q: "Qu'est-ce qui t'allume le plus ?", opts: ["Les vidéos pornographiques", "La littérature érotique", "Les photos coquines", "Rien de tout ça, c'est toi qui m'allumes"] },
  { n: 32, bloc: 3, q: "Quels sont le meilleur moment et le meilleur endroit pour une petite vite à la maison ?" },
  { n: 33, bloc: 3, q: "Qu'est ce qui te rendrais plus disponible pour partager un moment intime en revenant du boulot?", opts: ["Un souper romantique déjà servi à la table", "Un bain moussant illuminé par des chandelles", "Une maison entièrement propre"] },
  { n: 34, bloc: 3, q: "Quelle est la meilleure chanson pour faire l'amour ?" },
  { n: 35, bloc: 3, q: "Si tu n'avais le droit qu'à un seul choix de ma part pour le reste de ta vie, ce serait lequel ?", opts: ["Sexto", "Photo coquine", "Appel érotique"] },
  { n: 36, bloc: 3, q: "Quel habillement t'allume le plus quand tu me regardes ?", opts: ["Complètement nu(e)", "De la lingerie", "Un vêtement provocateur", "Habillé(e) normalement — le mystère"] },
  { n: 37, bloc: 3, q: "Quelles sont tes zones érogènes qui te procurent le plus de sensations ?", opts: ["Le cou", "Les oreilles", "Les pieds"] },
  { n: 38, bloc: 3, q: "Pendant l'acte, tu aimes mieux ?", opts: ["Mener", "Être soumis(e)", "On partage la tâche"] },
  { n: 39, bloc: 3, q: "Si tu devais choisir un seul style pour vivre ta sexualité pour le reste de ta vie, lequel te ressemble le plus ?", opts: ["Sensoriel — musique, lumières tamisées, parfums, textures, tout est dans l'ambiance", "Le classique assumé — efficace, confortable, dans les pantoufles et fier·e de l'être", "Domination/soumission — quelqu'un prend les rênes, et c'est exactement ce que tu veux", "Intense et sans retenue — tu veux que ça laisse des traces, au sens figuré ou littéral"] },

  { n: 40, bloc: 4, q: "Si on devait vivre un trip à trois, tu préférerais que ce soit avec un autre homme ou une autre femme ?" },
  { n: 41, bloc: 4, q: "Décris-moi étape par étape ce que je devrais te faire pour que tu atteignes l'orgasme de ta vie." },
  { n: 42, bloc: 4, q: "Si tu pouvais choisir un seul endroit parmi tous ceux où on a eu des ébats pour le revivre encore une fois, lequel choisirais-tu?" },
  { n: 43, bloc: 4, q: "Dans quel endroit public aurais-tu le goût qu'on fasse l'amour sans se faire surprendre ?" },
  { n: 44, bloc: 4, q: "Si on tournait un film érotique juste pour nous deux, ça se passerait où et ça ressemblerait à quoi ?" },
  { n: 45, bloc: 4, q: "Quelle catégorie de film porno aimes-tu le mieux regarder ?", opts: ["Couple en action", "Plaisir solitaire", "Gai/lesbienne", "En groupe", "Tendresse et romance", "Sexe oral"] },
  { n: 46, bloc: 4, q: "Dans un salon de l'érotisme, à quel endroit je risque de te croiser ?", opts: ["Au kiosque de lingerie", "Au kiosque de vibrateurs", "Dans la section BDSM", "Au show érotique"] },
  { n: 47, bloc: 4, q: "Qu'est-ce que tu aimerais que je te fasse en ce moment ?", opts: ["Du sexe oral", "Une danse sexy", "Un massage érotique"] },
  { n: 48, bloc: 4, q: "Laquelle de ces catégories te décrit le mieux ?", opts: ["Voyeuriste", "Exhibitionniste", "Pudique", "Dominant(e)", "Soumis(e)", "Aventurier(ère)"] },
  { n: 49, bloc: 4, q: "Si on jouait un jeu de rôle ce soir, tu aimerais que j'incarne quel personnage ?" },
  { n: 50, bloc: 4, q: "Y a-t-il quelque chose qu'on n'a jamais essayé dans l'intimité mais que tu rêves qu'on tente ?" },
  { n: 51, bloc: 4, q: "Dans un sex-shop avec un budget illimité, tu dois acheter un truc pour moi et un truc pour toi — tu choisis quoi ?" },
  { n: 52, bloc: 4, q: "Quelle est la chanson que tu utiliserais pour un strip-tease ?" },
];

/* ---------- Utilitaires de pige ---------- */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Composant principal ---------- */

export default function NotreMoment() {
  const [screen, setScreen] = useState("cover"); // cover | select | card
  const [blocFilter, setBlocFilter] = useState(null); // null = toutes catégories, sinon id 1-4
  const [deck, setDeck] = useState([]);
  const [drawnCount, setDrawnCount] = useState(0);
  const [current, setCurrent] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const startDeck = (blocId) => {
    const pool = blocId ? QUESTIONS.filter((c) => c.bloc === blocId) : QUESTIONS;
    const shuffled = shuffle(pool);
    setDeck(shuffled);
    setDrawnCount(0);
    setBlocFilter(blocId);
    setCurrent(shuffled[0]);
    setFlipped(false);
    setAnimKey((k) => k + 1);
    setScreen("card");
  };

  const drawNext = () => {
    let nextIndex = drawnCount + 1;
    let nextDeck = deck;
    if (nextIndex >= deck.length) {
      // paquet épuisé -> on remélange
      nextDeck = shuffle(blocFilter ? QUESTIONS.filter((c) => c.bloc === blocFilter) : QUESTIONS);
      nextIndex = 0;
      setDeck(nextDeck);
    }
    setDrawnCount(nextIndex);
    setCurrent(nextDeck[nextIndex]);
    setFlipped(false);
    setAnimKey((k) => k + 1);
  };

  const bloc = current ? BLOCS[current.bloc - 1] : null;

  return (
    <div style={styles.page}>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {screen === "cover" && <Cover onStart={() => setScreen("select")} />}

      {screen === "select" && (
        <Select
          onPick={(id) => startDeck(id)}
          onBack={() => setScreen("cover")}
        />
      )}

      {screen === "card" && current && (
        <CardScreen
          key={animKey}
          card={current}
          bloc={bloc}
          flipped={flipped}
          onFlip={() => setFlipped(true)}
          onNext={drawNext}
          onChangeCategory={() => setScreen("select")}
          total={blocFilter ? BLOCS.find((b) => b.id === blocFilter) : null}
          progress={{ drawn: drawnCount + 1, of: deck.length }}
        />
      )}
    </div>
  );
}

/* ---------- Écran de couverture ---------- */

function Cover({ onStart }) {
  return (
    <div style={styles.cover}>
      <div style={styles.coverStars}>
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: `${Math.random() * 55}%`,
              left: `${Math.random() * 100}%`,
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.75)",
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>
      <div style={styles.coverContent}>
        <p style={styles.coverEyebrow}>S'explorons-nous présente</p>
        <h1 style={styles.coverTitle}>
          Notre <span style={{ fontStyle: "italic", fontWeight: 500 }}>moment</span>
        </h1>
        <div style={styles.coverDivider} />
        <p style={styles.coverSub}>52 cartes pour couples, à piger à deux</p>
        <button style={styles.coverBtn} onClick={onStart}>
          Piger une carte
        </button>
      </div>
      <div style={styles.coverSilhouette} />
    </div>
  );
}

/* ---------- Écran de sélection de catégorie ---------- */

function Select({ onPick, onBack }) {
  return (
    <div style={styles.select}>
      <button style={styles.backBtn} onClick={onBack}>← Retour</button>
      <h2 style={styles.selectTitle}>Choisissez votre ambiance</h2>
      <p style={styles.selectSub}>Quatre blocs, une seule règle : dites la vérité.</p>

      <div style={styles.blocGrid}>
        {BLOCS.map((b) => {
          const Icon = b.icon;
          return (
            <button
              key={b.id}
              style={{ ...styles.blocCard, background: b.light }}
              onClick={() => onPick(b.id)}
              className="bloc-card"
            >
              <div style={{ ...styles.blocIconWrap, background: b.primary }}>
                <Icon color="#ffffff" />
              </div>
              <div style={{ ...styles.blocCardTitle, color: b.dark }}>{b.title}</div>
              <div style={styles.blocCardSub}>{b.subtitle}</div>
            </button>
          );
        })}
      </div>

      <button style={styles.allBtn} onClick={() => onPick(null)}>
        Piger dans les 52 cartes
      </button>
    </div>
  );
}

/* ---------- Écran de carte ---------- */

function CardScreen({ card, bloc, flipped, onFlip, onNext, onChangeCategory, progress }) {
  const Icon = bloc.icon;
  return (
    <div style={{ ...styles.cardScreen, background: bloc.light }}>
      <button style={{ ...styles.backBtn, color: bloc.dark }} onClick={onChangeCategory}>
        ← Catégories
      </button>

      <div style={{ ...styles.blocLabel, color: bloc.dark }}>
        <span style={{ ...styles.blocDot, background: bloc.primary }} />
        {bloc.title}
      </div>

      <div className="flip-wrap" onClick={!flipped ? onFlip : undefined} style={styles.flipWrap}>
        <div className={`flip-card ${flipped ? "is-flipped" : ""}`}>
          {/* dos de la carte */}
          <div className="flip-face flip-back" style={{ background: `linear-gradient(160deg, ${bloc.primary}, ${bloc.dark})` }}>
            <div style={styles.backIconWrap}>
              <Icon color="#ffffff" />
            </div>
            <p style={styles.backHint}>Touchez pour piger</p>
            <p style={styles.backNumber}>#{String(card.n).padStart(2, "0")}</p>
          </div>

          {/* face avec la question */}
          <div className="flip-face flip-front" style={{ borderColor: bloc.primary }}>
            <span style={{ ...styles.cardNumber, color: bloc.primary }}>
              {String(card.n).padStart(2, "0")}
            </span>
            <p style={styles.cardQuestion}>{card.q}</p>
            {card.opts && (
              <ul style={styles.cardOpts}>
                {card.opts.map((o, i) => (
                  <li key={i} style={styles.cardOptItem}>
                    <span style={{ color: bloc.primary, fontWeight: 700 }}>
                      {String.fromCharCode(65 + i)}.{" "}
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <p style={styles.progress}>
        Carte {progress.drawn} / {progress.of}
      </p>

      <button
        style={{ ...styles.nextBtn, background: bloc.primary }}
        onClick={onNext}
      >
        Piger la prochaine carte
      </button>
    </div>
  );
}

/* ---------- Styles ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    fontFamily: "'Nunito Sans', sans-serif",
    background: "#111",
    display: "flex",
    justifyContent: "center",
  },

  /* Cover */
  cover: {
    position: "relative",
    width: "100%",
    maxWidth: 480,
    minHeight: "100vh",
    overflow: "hidden",
    background: "linear-gradient(180deg, #14504E 0%, #1F8F8A 32%, #C46E92 72%, #7A2E4C 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 32px",
  },
  coverStars: { position: "absolute", inset: 0 },
  coverContent: { position: "relative", zIndex: 2, textAlign: "center" },
  coverEyebrow: {
    color: "rgba(255,255,255,0.85)",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontSize: 12,
    marginBottom: 18,
  },
  coverTitle: {
    fontFamily: "'Playfair Display', serif",
    color: "#fff",
    fontSize: 52,
    letterSpacing: "0.02em",
    margin: 0,
    lineHeight: 1.05,
  },
  coverDivider: {
    width: 60,
    height: 2,
    background: "rgba(255,255,255,0.6)",
    margin: "22px auto",
  },
  coverSub: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    color: "rgba(255,255,255,0.92)",
    fontSize: 19,
    marginBottom: 40,
  },
  coverBtn: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.04em",
    color: "#7A2E4C",
    background: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "16px 40px",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  coverSilhouette: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "22%",
    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(20,10,15,0.55) 100%)",
  },

  /* Select */
  select: {
    width: "100%",
    maxWidth: 480,
    minHeight: "100vh",
    background: "#FBF7F5",
    padding: "28px 24px 40px",
    boxSizing: "border-box",
  },
  selectTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    color: "#3A2A30",
    margin: "36px 0 6px",
  },
  selectSub: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    color: "#7A6A70",
    fontSize: 17,
    marginBottom: 28,
  },
  blocGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  blocCard: {
    border: "none",
    borderRadius: 20,
    padding: "22px 14px",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minHeight: 160,
  },
  blocIconWrap: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blocCardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16,
    lineHeight: 1.25,
  },
  blocCardSub: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 12.5,
    color: "#7A6A70",
    lineHeight: 1.35,
  },
  allBtn: {
    width: "100%",
    marginTop: 22,
    padding: "16px",
    borderRadius: 999,
    border: "1.5px solid #3A2A30",
    background: "transparent",
    color: "#3A2A30",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 700,
    fontSize: 14.5,
    letterSpacing: "0.02em",
    cursor: "pointer",
  },
  backBtn: {
    background: "none",
    border: "none",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    color: "#3A2A30",
    cursor: "pointer",
    padding: 0,
  },

  /* Card screen */
  cardScreen: {
    width: "100%",
    maxWidth: 480,
    minHeight: "100vh",
    padding: "28px 24px 36px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  blocLabel: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    margin: "22px 0 18px",
  },
  blocDot: { width: 8, height: 8, borderRadius: "50%", display: "inline-block" },
  flipWrap: {
    width: "100%",
    maxWidth: 340,
    aspectRatio: "3 / 4.3",
    cursor: "pointer",
  },
  backIconWrap: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  backHint: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
  },
  backNumber: {
    position: "absolute",
    bottom: 22,
    fontFamily: "'Playfair Display', serif",
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
  },
  cardNumber: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 22,
    display: "block",
    marginBottom: 14,
  },
  cardQuestion: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 19,
    lineHeight: 1.4,
    color: "#2E2228",
    margin: 0,
  },
  cardOpts: {
    marginTop: 18,
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  cardOptItem: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 14,
    lineHeight: 1.4,
    color: "#4A3A40",
  },
  progress: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 12.5,
    color: "#8A7A80",
    marginTop: 22,
    letterSpacing: "0.02em",
  },
  nextBtn: {
    marginTop: 16,
    width: "100%",
    maxWidth: 340,
    padding: "16px",
    borderRadius: 999,
    border: "none",
    color: "#fff",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 700,
    fontSize: 14.5,
    letterSpacing: "0.02em",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
  },
};

const CSS = `
  .flip-wrap { perspective: 1400px; }
  .flip-card {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(.4,.2,.2,1);
    transform-style: preserve-3d;
  }
  .flip-card.is-flipped { transform: rotateY(180deg); }
  .flip-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 26px;
    box-sizing: border-box;
    box-shadow: 0 16px 40px rgba(0,0,0,0.16);
  }
  .flip-back { }
  .flip-front {
    transform: rotateY(180deg);
    background: #fff;
    border: 2px solid;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    overflow-y: auto;
  }
  .bloc-card { transition: transform 0.15s ease; }
  .bloc-card:active { transform: scale(0.97); }
  * { box-sizing: border-box; }
`;
