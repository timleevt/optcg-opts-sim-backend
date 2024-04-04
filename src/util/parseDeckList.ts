// card-game.dev
// ["Exported from OnePiece-CardGame.dev","ST07-001","ST07-002","ST07-002","ST07-002","ST07-002","ST07-003","ST07-003","ST07-003","ST07-003","ST07-004","ST07-004","ST07-004","ST07-004","ST07-005","ST07-005","ST07-005","ST07-005","ST07-006","ST07-006","ST07-006","ST07-006","ST07-007","ST07-007","ST07-007","ST07-007","ST07-008","ST07-008","ST07-008","ST07-008","ST07-009","ST07-009","ST07-009","ST07-010","ST07-010","ST07-010","ST07-010","ST07-011","ST07-011","ST07-011","ST07-011","ST07-012","ST07-012","ST07-012","ST07-012","ST07-013","ST07-013","ST07-013","ST07-014","ST07-014","ST07-014","ST07-016"]

// op top decks
// ["Exported from onepiecetopdecks.com","OP06-080","OP02-114","OP02-114","OP02-096","OP02-096","ST06-006","ST06-006","ST06-010","ST06-010","OP02-106","OP02-106","OP02-106","OP02-106","OP03-089","OP03-089","OP03-089","OP03-089","OP04-083","OP04-083","OP04-083","OP05-093","OP05-093","OP05-093","OP06-081","OP06-081","OP06-081","OP06-081","OP06-086","OP06-086","OP06-086","OP06-086","OP06-090","OP06-090","OP06-090","OP06-090","OP06-091","OP06-091","OP06-091","OP06-091","OP06-093","OP06-093","OP06-093","OP06-093","ST06-015","ST06-015","ST06-015","ST06-015","OP02-117","OP02-117","OP02-117","OP02-117"]

type DeckList = { [key: string]: number };
const parseDeckList = (deckList: string | string[]) => {
  //   const deck: DeckList = {};
  // const deck = new Map<string, number>();
  // const cardList = new Set();
  const deckObj: DeckList = {};
  if (typeof deckList === "string") {
    // For Sim/Egman Events Lists NEED TO FIX
    // let res = deckList.split(/(\d)x/).filter(Boolean);
    // for (let i = 0; i < res.length - 1; i += 2) {
    //   deck.set(res[i + 1], parseInt(res[i]))
    // }
    return {};
  } else {
    // For website OP top decks/cardgame.dev lists
    for (let i = 1; i < deckList.length; i++) {
      // deck.set(deckList[i], (deck.get(deckList[i]) ?? 0) + 1);
      // cardList.add(deckList[i]);
      deckObj[deckList[i]] = (deckObj[deckList[i]] ?? 0) + 1;
    }
    return deckObj;
  }
  // return deck;
};

export default parseDeckList;
