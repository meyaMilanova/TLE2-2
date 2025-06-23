const wasteItems = [
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
        name: "Kauwgum",
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


export default wasteItems;
