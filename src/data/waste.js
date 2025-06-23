export const wasteItems = [
    {
        name: "Afvalzak",
        image: "../wastesorting/afvalzak.png",
        category: "restafval",
    },
    {
        name: "Appel",
        image: "../wastesorting/appel.png",
        category: "organic",
    },
    {
        name: "Broodje",
        image: "../wastesorting/broodje.png",
        category: "organic",
    },
    {
        name: "Flesje",
        image: "../wastesorting/flesje.png",
        category: "plastic",
    },
    {
        name: "Karton",
        image: "../wastesorting/karton.png",
        category: "papier",
    },
    {
        name: "Papier",
        image: "../wastesorting/papier.png",
        category: "papier",
    },
    {
        name: "Schone pizzadoos",
        image: "../wastesorting/pizzadoos.png",
        category: "papier",
    },
    {
        name: "Tasje",
        image: "../wastesorting/tasje.png",
        category: "plastic",
    },
    {
        name: "Vuile pizzadoos",
        image: "../wastesorting/pizzadoos2.png",
        category: "restafval",
    },
    {
        name: "Kauwgom",
        image: "../wastesorting/gum1.png",
        category: "restafval",
    },
];

export const bins = [
    { id: "plastic", label: "Plastic", img: "../wastesorting/trash_orange.png" },
    { id: "organic", label: "GFT", img: "../wastesorting/trash_green.png" },
    { id: "paper", label: "Papier", img: "../wastesorting/trash_blue.png" },
    { id: "rest", label: "Rest", img: "../wastesorting/trash_black.png" },
];

export const explanations = {
    plastic: "Dit is plastic. Plastic verpakkingen horen in de plasticbak zodat ze gerecycled kunnen worden.",
    organic: "Dit is organisch afval. Etensresten horen in de GFT-bak voor compostering.",
    paper: "Dit is papier. Schoon en droog papier hoort in de papierbak om hergebruikt te worden.",
    rest: "Dit is restafval. Dit soort afval kan niet gerecycled worden en hoort in de restbak.",
};

export const map = {
    gft: "organic",
    organic: "organic",
    plastic: "plastic",
    papier: "paper",
    paper: "paper",          // extra safety
    restafval: "rest",
    rest: "rest",
};

export const facts = {
    "Afvalzak": [
        "Wist je dat restafval niet gerecycled kan worden? Minder restafval is beter voor de aarde!",
        "Restafval wordt meestal verbrand. Dat kost energie en is slecht voor het milieu.",
        "Hoe minder restafval je hebt, hoe beter je aan het scheiden bent!"
    ],
    "Appel": [
        "Wist je dat groente- en fruitafval omgezet wordt in compost voor planten?",
        "Een appelklokhuis hoort in de groene bak: daar wordt nieuwe aarde van gemaakt!",
        "Fruitafval helpt planten groeien als het goed gescheiden wordt."
    ],
    "Broodje": [
        "GFT-afval zoals brood helpt bij het maken van nieuwe aarde!",
        "Wist je dat oud brood beter in de GFT-bak kan dan in de prullenbak?",
        "Van etensresten zoals brood wordt compost of biogas gemaakt."
    ],
    "Flesje": [
        "Plastic flesjes kun je recyclen tot fleece truien of nieuwe flessen!",
        "Wist je dat een plastic flesje wel 450 jaar kan blijven liggen in de natuur?",
        "Door flesjes te recyclen bespaar je veel energie en grondstoffen."
    ],
    "Karton": [
        "Karton hoort bij papier en kan goed worden hergebruikt.",
        "Wist je dat van oud karton weer nieuwe dozen worden gemaakt?",
        "Gooi karton zonder etensresten in de papierbak!"
    ],
    "Papier": [
        "Papier kan wel 7 keer hergebruikt worden als je het goed sorteert!",
        "Wist je dat 1 kilo oud papier wel 3 kilo hout kan besparen?",
        "Gooi nat of vies papier niet in de papierbak, dat kan niet gerecycled worden."
    ],
    "Pizzadoos": [
        "Een schone pizzadoos mag bij het papier. Een vette niet!",
        "Wist je dat vet papier niet gerecycled kan worden?",
        "Tip: scheur de schone helft van de pizzadoos af en gooi die bij het papier."
    ],
    "Tasje": [
        "Wist je dat plastic tasjes soms in de natuur blijven liggen? Ze horen bij het plastic afval.",
        "Gebruik een herbruikbare tas, dat is veel beter voor het milieu!",
        "Wist je dat dieren plastic tasjes soms opeten? Dat is gevaarlijk voor ze."
    ],
    "Kauwgom": [
        "Kauwgom hoort bij restafval, het kan niet gerecycled worden.",
        "Wist je dat kauwgom wel 20 jaar op straat kan blijven plakken?",
        "Gooi kauwgom altijd in de prullenbak, anders blijft het overal kleven."
    ],
    "Vuile pizzadoos": [
        "Vette pizzadozen horen bij het restafval. Vet papier kan niet worden hergebruikt.",
        "Probeer de schone stukken af te scheuren en die wel bij het papier te doen.",
        "Wist je dat vet karton machines verstopt in de papierfabriek?"
    ]
};
