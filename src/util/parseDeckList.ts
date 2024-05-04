/* Utility to parse deck list from raw text to object
 Type 1: Bracket 
 Ex. ["Exported from OnePiece-CardGame.dev","ST07-001",...]
 Type 2: Text
*/

type DeckList = { [key: string]: number };

const parseDeckList = (deckList: string | string[]) => {
  const deckListObj: DeckList = {};

  // ARRAY TYPE - (for ones already stored in DB)
  if (Array.isArray(deckList)) {
    for (let i = 1; i < deckList.length; i++) {
      deckListObj[deckList[i]] = (deckListObj[deckList[i]] ?? 0) + 1;
    }
  }
  // BRACKET TYPE
  else if (typeof deckList === "string" && deckList.includes("[")) {
    // Remove all brackets and quotation marks
    const deckListStr = deckList.replace(/[\[\]\"']/g, "");
    const deckListArr = deckListStr.split(",");

    for (let i = 1; i < deckListArr.length; i++) {
      deckListObj[deckListArr[i]] = (deckListObj[deckListArr[i]] ?? 0) + 1;
    }
  } else {
    // TEXT TYPE:
    if (typeof deckList === "string") {
      // For Sim/Egman Events Lists
      let deckSplitRegex = deckList.split(/(\d)x|\n/).filter(Boolean);
      for (let i = 0; i < deckSplitRegex.length; i += 2) {
        deckListObj[deckSplitRegex[i + 1]] = parseInt(deckSplitRegex[i]);
      }
    }
  }

  return deckListObj;
};

export default parseDeckList;
