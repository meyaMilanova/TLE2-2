function funFact() {
    const funFacts = [
        "Wist je dat één boom genoeg zuurstof maakt voor vier mensen om te ademen?",
        "Sommige tassen worden gemaakt van oude plastic flessen.",
        "De gemiddelde Nederlander gebruikt per dag ongeveer 120 liter water. Dat zijn 600 glazen water per persoon!",
        "Walvissen houden de oceanen gezond door de voedselketen in balans te houden.",
        "Er bestaan paddenstoelen die plastic kunnen opeten en opruimen. Net echte schoonmakers van de natuur!",
        "Één bijtje bezoekt wel 2.000 bloemen per dag om nectar te verzamelen. Wat een harde werker!",
        "In Japan maken ze papier van oude melkpakken. Zo hoeft er minder papier van bomen te komen.",
        "Er bestaan potloden die je kan planten waar dan een bloem of plantje uit groeit.",
        "Plastic flesjes kunnen worden gerecycled tot sportkleding of schoenen.",
        "Één grote windmolen met drie wieken kan stroom maken voor wel duizend huizen tegelijk.",
        "Als je één blikje recyclet, bespaar je genoeg energie om 3 uur televisie te kijken.",
        "Een ledlamp gebruikt tot 90% minder energie dan een gloeilamp.",
        "Wist je dat sommige planten in huis de lucht zuiveren en schoonmaken?",
        "Er zijn tegels waar je stroom mee opwekt als je erop springt of loopt.",
        "Op sommige daken groeien planten en bloemen om de stad koel te houden en water op te vangen.",
        "Bamboe groeit supersnel: wel één meter per dag! En je kunt er van alles van maken.",
        "Oude autobanden worden soms omgetoverd tot klimrekken en schommels in speeltuinen.",
        "Door afval netjes te scheiden, kunnen blikjes, papier en plastic opnieuw worden gebruikt.",
        "In sommige landen planten ze een boom voor iedere baby die wordt geboren.",
        "Er bestaan speeltuinen die helemaal gebouwd zijn van gerecycled plastic en hout.",
        "Gebruik je herbruikbare boterhamzakjes? Dan bespaar je honderden wegwerpzakjes per jaar!",
        "Van restjes groenten en fruit kun je zelf natuurlijke verf maken.",
        "Plastic afval uit rivieren wordt met slimme boten en drijvende netten gevangen voordat het de zee in drijft.",
        "Sommige mensen bouwen huizen van flessen, blikken en ander gerecycled materiaal.",
        "Er bestaan telefoonhoesjes die helemaal van planten gemaakt zijn en na verloop van tijd vanzelf afbreken in de natuur.",
        "In sommige steden rijden vuilniswagens op frituurvet dat overblijft uit restaurants.",
        "Er zijn lampjes die je overdag oplaadt in de zon en 's avonds in je tent of tuin gebruikt.",
        "Lever je oude mobieltje in, dan worden de waardevolle onderdelen eruit gehaald en opnieuw gebruikt.",
        "Er zijn vuilnisbakken met zonnepanelen erop die zichzelf kunnen aandrukken zodat er meer afval in past.",
        "Van oude fietskettingen worden sieraden en sleutelhangers gemaakt."
    ]
    const today = new Date();
    const dateString = today.toISOString().slice(0,10);

    let hash = 0
    for (let i = 0; i < dateString.length; i++) {
        hash = (hash << 5) - hash + dateString.charCodeAt(i);
        hash |=0;
    }

    const index = Math.abs(hash) % funFacts.length;

    return funFacts[index];
}

export default funFact()