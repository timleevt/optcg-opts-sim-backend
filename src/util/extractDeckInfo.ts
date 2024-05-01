type cards = {
  code: string;
  name: string;
  cardType: string;
  cost: number | null;
  type: string[];
  power: number | null;
  attribute: string[];
  counterPower: number | null;
  colors: string;
  effect: string;
  trigger: string | null;
  keywords: string[];
  copies: number;
};

const extractDeckInfo = (deck: cards[]) => {
  const leader = deck.filter((i) => i.cardType === "Leader")[0].code;
  const deckList: string[] = [];
  deck.forEach(i => {
    for (let c = 0; c < i.copies; c++) {
        deckList.push(i.code);
    }
  })

  return {leaderCard: leader, deckCodes: deckList};
};

export default extractDeckInfo;
