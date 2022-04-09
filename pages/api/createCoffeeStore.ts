import { NextApiRequest, NextApiResponse } from "next";
import { CoffeeStoreFields } from "../../models/coffee-store";
import { table, getMinifiedRecords } from "../../lib/airtable";
import Airtable, { FieldSet } from "airtable";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: CoffeeStoreFields;
}

const createCoffeeStore = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { id, address, name, neighbourhood, imgUrl, voting } = req.body;
      if (id) {
        const findCoffeeStoreRecords: Airtable.Records<FieldSet> = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length > 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json({ records });
          } else {
            res.status(400).json({ message: "id or name is missing" });
          }
        }
      } else {
        res.status(400).json({ message: "id is missing" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
};

export default createCoffeeStore;
