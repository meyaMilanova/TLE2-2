const questions = [
    {
        id: 1,
        question: "Wat doe je met een plastic fles waar nog een beetje water in zit?",
        options: ["GFT", "Papier", "Plastic"],
        answer: "Plastic",
        explanation: "Plastic flessen horen bij het plastic afval. Een klein beetje water erin is geen probleem; dat wordt tijdens het recycleproces verwijderd."
    },
    {
        id: 2,
        question: "Waar hoort een lege pizzadoos met vetvlekken?",
        options: ["Papier", "Restafval", "Plastic"],
        answer: "Restafval",
        explanation: "Een vettige pizzadoos is vervuild en mag daarom niet bij het papier. Het hoort bij het restafval."
    },
    {
        id: 3,
        question: "Waar moet een glazen pot zonder deksel?",
        options: ["Restafval", "Glasbak", "Plastic"],
        answer: "Glasbak",
        explanation: "Glazen potten (zonder deksel) horen in de glasbak. De deksel mag bij het restafval of plastic, afhankelijk van het materiaal."
    },
    {
        id: 4,
        question: "Waar hoort een kapotte spiegel?",
        options: ["Restafval", "Glasbak", "Milieustraat"],
        answer: "Milieustraat",
        explanation: "Spiegels horen niet in de glasbak omdat ze speciaal glas bevatten. Breng ze naar de milieustraat."
    },
    {
        id: 5,
        question: "Wat doe je met een leeg melkpak?",
        options: ["Papier", "Plastic", "Restafval"],
        answer: "Plastic",
        explanation: "Melkpakken zijn karton met een plastic/aluminium laagje. Ze horen bij het plastic afval."
    },
    {
        id: 6,
        question: "Waar hoort een bananenschil?",
        options: ["Restafval", "Plastic", "GFT"],
        answer: "GFT",
        explanation: "Bananenschillen zijn groente- en fruitafval en horen dus in de GFT-bak."
    },
    {
        id: 7,
        question: "Waar hoort een kapotte paraplu?",
        options: ["Restafval", "Plastic", "Milieustraat"],
        answer: "Restafval",
        explanation: "Een paraplu is een samengesteld product dat moeilijk te recyclen is. Gooi deze in het restafval."
    },
    {
        id: 8,
        question: "Wat doe je met een kapotte laptop?",
        options: ["Restafval", "Milieustraat", "Plastic"],
        answer: "Milieustraat",
        explanation: "Elektronische apparaten zoals laptops moeten naar de milieustraat of een inzamelpunt voor e-waste."
    },
    {
        id: 9,
        question: "Waar hoort een krant?",
        options: ["Papier", "Restafval", "Plastic"],
        answer: "Papier",
        explanation: "Een krant is schoon papierafval en hoort dus bij het oud papier."
    },
    {
        id: 10,
        question: "Waar hoort een theezakje?",
        options: ["Restafval", "GFT", "Papier"],
        answer: "GFT",
        explanation: "Theezakjes mogen bij het GFT, tenzij ze van plastic zijn. De meeste moderne theezakjes zijn composteerbaar."
    },
    {
        id: 11,
        question: "Wat doe je met een lege chipszak?",
        options: ["Plastic", "Restafval", "Papier"],
        answer: "Restafval",
        explanation: "Chipszakken zijn vaak van metaalfolie en plastic, wat niet goed te scheiden is. Gooi ze in het restafval."
    },
    {
        id: 12,
        question: "Waar hoort een leeg blikje frisdrank?",
        options: ["Plastic", "Restafval", "PMD"],
        answer: "PMD",
        explanation: "Blikjes mogen bij PMD (plastic, metaal, drankkartons). Controleer lokaal of ze daarheen mogen."
    },
    {
        id: 13,
        question: "Waar gooi je een kapotte wijnglas weg?",
        options: ["Glasbak", "Restafval", "Milieustraat"],
        answer: "Restafval",
        explanation: "Drinkglazen horen niet in de glasbak. Ze bevatten ander glas dan verpakkingsglas en verstoren het recycleproces."
    },
    {
        id: 14,
        question: "Wat doe je met een leeg deodorantbusje?",
        options: ["Restafval", "Milieustraat", "PMD"],
        answer: "PMD",
        explanation: "Lege metalen spuitbussen mogen meestal bij PMD. Bij twijfel: milieustraat."
    },
    {
        id: 15,
        question: "Waar hoort een afhaalmaaltijdcontainer van aluminium?",
        options: ["Plastic", "Restafval", "PMD"],
        answer: "PMD",
        explanation: "Aluminium verpakkingen zoals afhaalbakjes mogen bij PMD."
    },
    {
        id: 16,
        question: "Waar gooi je een volle verfbus weg?",
        options: ["Restafval", "Milieustraat", "PMD"],
        answer: "Milieustraat",
        explanation: "Chemisch afval zoals verf hoort naar de milieustraat. Het mag nooit bij restafval of PMD."
    },
    {
        id: 17,
        question: "Wat doe je met een oude mobiele telefoon?",
        options: ["Restafval", "Milieustraat", "Papier"],
        answer: "Milieustraat",
        explanation: "Mobiele telefoons bevatten elektronica en waardevolle metalen. Lever ze in bij een e-waste inzamelpunt of de milieustraat."
    },
    {
        id: 18,
        question: "Wat doe je met een plastic speelgoedauto?",
        options: ["Plastic", "Restafval", "Milieustraat"],
        answer: "Restafval",
        explanation: "Plastic speelgoed is geen verpakkingsmateriaal en hoort dus niet bij plastic afval. Gooi het in het restafval."
    },
    {
        id: 19,
        question: "Waar gooi je een oude televisie weg?",
        options: ["Restafval", "Milieustraat", "Plastic"],
        answer: "Milieustraat",
        explanation: "Elektronisch afval zoals televisies moet naar de milieustraat of een speciaal e-waste punt."
    },
    {
        id: 20,
        question: "Wat doe je met een kapotte gloeilamp?",
        options: ["Restafval", "Milieustraat", "Glasbak"],
        answer: "Milieustraat",
        explanation: "Gloeilampen bevatten metalen en breekbaar glas en mogen niet in de glasbak. Breng ze naar de milieustraat."
    },
    {
        id: 21,
        question: "Waar hoort een oude krant?",
        options: ["Papier", "Restafval", "GFT"],
        answer: "Papier",
        explanation: "Oude kranten zijn schoon papierafval en mogen gewoon bij het oud papier."
    },
    {
        id: 22,
        question: "Waar gooi je een beschimmelde boterham weg?",
        options: ["Restafval", "Papier", "GFT"],
        answer: "GFT",
        explanation: "Bedorven etensresten zoals beschimmeld brood mogen bij het GFT-afval."
    },
    {
        id: 23,
        question: "Waar hoort een lege tandpastatube?",
        options: ["Plastic", "Restafval", "PMD"],
        answer: "Restafval",
        explanation: "Tandpastatubes zijn lastig te recyclen door hun samenstelling. Gooi ze bij het restafval."
    },
    {
        id: 24,
        question: "Wat doe je met een kurk van een wijnfles?",
        options: ["GFT", "Restafval", "Plastic"],
        answer: "Restafval",
        explanation: "Kurken (natuurlijk of kunststof) mogen bij het restafval, niet bij GFT of plastic."
    },
    {
        id: 25,
        question: "Waar hoort een eierdoos van karton?",
        options: ["Papier", "GFT", "Restafval"],
        answer: "Papier",
        explanation: "Kartonnen eierdozen mogen gewoon bij het oud papier, zolang ze niet vervuild zijn met etensresten."
    }
];


export default questions;