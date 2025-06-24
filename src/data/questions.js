const questions = [
    {
        id: 1,
        question: "Wat doe je met een plastic fles waar nog een beetje water in zit?",
        options: ["GFT", "Papier", "Plastic", "Restafval"],
        answer: "Plastic",
        explanation: "Plastic flessen horen bij het PMD-afval (plastic, metaal, drankkartons). Een beetje water is geen probleem."
    },
    {
        id: 2,
        question: "Waar hoort een lege pizzadoos met vetvlekken?",
        options: ["Papier", "Restafval", "Plastic", "GFT"],
        answer: "Restafval",
        explanation: "Vettige pizzadozen mogen niet bij het papier. Die horen in het restafval."
    },
    {
        id: 3,
        question: "Wat doe je met een leeg melkpak?",
        options: ["Papier", "Plastic", "Restafval", "GFT"],
        answer: "Plastic",
        explanation: "Melkpakken zijn drankenkartons en vallen onder PMD-afval in Rotterdam."
    },
    {
        id: 4,
        question: "Waar hoort een bananenschil?",
        options: ["Restafval", "Plastic", "GFT", "Papier"],
        answer: "GFT",
        explanation: "Organisch keukenafval zoals een bananenschil hoort bij GFT."
    },
    {
        id: 5,
        question: "Waar hoort een krant?",
        options: ["Papier", "Restafval", "Plastic", "GFT"],
        answer: "Papier",
        explanation: "Schone kranten mogen bij het oud papier."
    },
    {
        id: 6,
        question: "Waar hoort een theezakje?",
        options: ["Restafval", "GFT", "Papier", "Plastic"],
        answer: "Restafval",
        explanation: "In Rotterdam mogen theezakjes helaas niet bij GFT, vanwege plastic onderdelen. Gooi ze in het restafval."
    },
    {
        id: 7,
        question: "Wat doe je met een lege chipszak?",
        options: ["Plastic", "Restafval", "Papier", "GFT"],
        answer: "Restafval",
        explanation: "Chipszakken zijn vaak van gemengde materialen. Die mogen bij het restafval."
    },
    {
        id: 8,
        question: "Wat doe je met een plastic speelgoedauto?",
        options: ["Plastic", "Restafval", "Papier", "GFT"],
        answer: "Restafval",
        explanation: "Plastic speelgoed is geen verpakking. Het hoort in het restafval of bij grofvuil als het groot is."
    },
    {
        id: 9,
        question: "Waar hoort een oude krant?",
        options: ["Papier", "Restafval", "GFT", "Plastic"],
        answer: "Papier",
        explanation: "Oude kranten zijn schoon papierafval en mogen bij het oud papier."
    },
    {
        id: 10,
        question: "Waar gooi je een beschimmelde boterham weg?",
        options: ["Restafval", "Papier", "GFT", "Plastic"],
        answer: "GFT",
        explanation: "In Rotterdam mogen beschimmelde etensresten bij het GFT."
    },
    {
        id: 11,
        question: "Waar hoort een lege tandpastatube?",
        options: ["Plastic", "Restafval", "Papier", "GFT"],
        answer: "Restafval",
        explanation: "Tandpastatubes zijn lastig te recyclen en horen bij het restafval."
    },
    {
        id: 12,
        question: "Wat doe je met een kurk van een wijnfles?",
        options: ["GFT", "Restafval", "Plastic", "Papier"],
        answer: "Restafval",
        explanation: "Kurken horen in het restafval, tenzij je ze apart inlevert bij een milieustraat."
    },
    {
        id: 13,
        question: "Waar hoort een eierdoos van karton?",
        options: ["Papier", "GFT", "Restafval", "Plastic"],
        answer: "Papier",
        explanation: "Schone kartonnen eierdozen mogen bij het oud papier."
    },
    {
        id: 14,
        question: "Waar hoort een papieren broodzak met een plastic venster?",
        options: ["Papier", "Plastic", "Restafval", "GFT"],
        answer: "Restafval",
        explanation: "De combinatie van materialen maakt dit ongeschikt voor papierinzameling. Gooi het bij het restafval."
    },
    {
        id: 15,
        question: "Waar gooi je een koffiefilter met gebruikte koffieprut?",
        options: ["GFT", "Papier", "Plastic", "Restafval"],
        answer: "GFT",
        explanation: "Papieren koffiefilters en koffieprut mogen bij het GFT in Rotterdam."
    },
    {
        id: 16,
        question: "Wat doe je met een reclamefolder met nietjes erin?",
        options: ["Papier", "Restafval", "Plastic", "GFT"],
        answer: "Papier",
        explanation: "Nietjes zijn geen probleem: folders mogen bij het papier."
    },
    {
        id: 17,
        question: "Waar hoort een leeg plastic boterkuipje?",
        options: ["Plastic", "Papier", "Restafval", "GFT"],
        answer: "Plastic",
        explanation: "Verpakkingen zoals boterkuipjes horen bij het PMD-afval."
    },
    {
        id: 18,
        question: "Wat doe je met een appelschil?",
        options: ["GFT", "Papier", "Plastic", "Restafval"],
        answer: "GFT",
        explanation: "Appelschillen mogen bij het GFT-afval."
    },
    {
        id: 19,
        question: "Waar gooi je een papieren zakdoek die is gebruikt?",
        options: ["Restafval", "Papier", "Plastic", "GFT"],
        answer: "Restafval",
        explanation: "Vervuild papier hoort niet bij het oud papier. Gooi gebruikte zakdoekjes in het restafval."
    },
    {
        id: 20,
        question: "Waar hoort een lege wc-rol?",
        options: ["Papier", "Restafval", "GFT", "Plastic"],
        answer: "Papier",
        explanation: "Wc-rolletjes zijn schoon karton en mogen bij het papier."
    },
    {
        id: 21,
        question: "Wat doe je met klokhuis van een appel?",
        options: ["GFT", "Papier", "Plastic", "Restafval"],
        answer: "GFT",
        explanation: "Klokhuizen horen bij het groente- en fruitafval."
    },
    {
        id: 22,
        question: "Waar gooi je een plastic verpakking van snoepjes?",
        options: ["Plastic", "Restafval", "Papier", "GFT"],
        answer: "Plastic",
        explanation: "Verpakkingen van plastic mogen bij het PMD-afval."
    },
    {
        id: 23,
        question: "Wat doe je met een envelop met een plastic venster?",
        options: ["Papier", "Restafval", "Plastic", "GFT"],
        answer: "Papier",
        explanation: "Plastic vensters worden eruit gehaald bij recycling. De envelop mag bij het papier."
    },
    {
        id: 24,
        question: "Waar hoort een leeg chipskokertje met een metalen bodem?",
        options: ["Restafval", "Papier", "Plastic", "GFT"],
        answer: "Restafval",
        explanation: "Samengestelde verpakkingen zoals Pringles-kokers horen bij het restafval."
    },
    {
        id: 25,
        question: "Wat doe je met een afgekoeld theezakje met touwtje?",
        options: ["GFT", "Restafval", "Papier", "Plastic"],
        answer: "Restafval",
        explanation: "In Rotterdam mogen theezakjes niet bij het GFT, vanwege kunststofdeeltjes. Gooi ze bij het restafval."
    }
];

export default questions;
