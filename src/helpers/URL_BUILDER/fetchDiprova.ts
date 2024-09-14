import URLbuilder from "./URLBuilder";

// const urlBuilder = new URLbuilder("localhost:3500", "book", ["dummyFetch", "dummy"]);
// const buildUrl = urlBuilder.startBuilderPipeLine()
// const URL = urlBuilder.GetFinalURL()
// const fetchProva = {

// }
export const dummyFetch = async () => {
    try {
        const urlBuilder = new URLbuilder("localhost:3500", "book", ["dummyFetch", "dummy"], {
            key1: "v1",
            key2: "v2",
            key3: "v3",
        });
        urlBuilder.startBuilderPipeLine();
        const FinalUrl = urlBuilder.GetFinalURL();

        if (!FinalUrl) {
            throw new Error("FinalUrl è undefined");
        }

        const response = await fetch(FinalUrl);

        if (!response.ok) {
            throw new Error(`errore durante la fetch - ${response.status}`);
        }

        const data = response.json();
        console.log(data);
    } catch (err) {
        console.error("Fetch error:", err);
    }
};
