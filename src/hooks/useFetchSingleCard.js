// Fetch a single card by id
import mtg from "mtgsdk";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../actions/set_loading";

export default function useFetchSingleCard() {
    const [details, setDetails] = useState([]);
    const cardId = useSelector((state) => state.cards.id);
    const dispatch = useDispatch();

    const getCardByID = async () => {
        try {
            const res = await mtg.card.find(cardId);
            setDetails(res.card);
            dispatch(setIsLoading(true));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (cardId.length > 0) {
            getCardByID();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardId]);

    return details;
}
