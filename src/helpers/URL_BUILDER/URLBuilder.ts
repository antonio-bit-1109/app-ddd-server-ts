class URLbuilder {
    //http://  localhost:3500  /   auth   /    refresh
    // http://localhost:3500/book/scrapingRandomInfo

    private BaseURL: string; //percorso principale, localhost o simili

    private MainPath: string; // elemento facente parte del dominio in quasi tutti i casi : (User, Book , auth)

    private AdditionalPath: string[]; // elemento che segue la stringa che identifica l'elemento di dominio

    private QueryParam?: { [key: string]: string }; // eventuale query param aggiuntivo dell URL

    private URL: string[];

    constructor(
        baseUrl_PARAM: string,
        MainPath_PARAM: string,
        AdditionalPath_PARAM: string[],
        queryParam_PARAM?: { [key: string]: string }
    ) {
        this.BaseURL = baseUrl_PARAM;
        this.MainPath = MainPath_PARAM;
        this.AdditionalPath = AdditionalPath_PARAM;
        this.QueryParam = queryParam_PARAM;
        this.URL = [];
    }

    public startBuilderPipeLine() {
        try {
            if (this.BaseURL && this.MainPath && this.AdditionalPath) {
                this.buildBaseUrl(this.BaseURL);
                this.AddMainPath(this.MainPath);
                this.addExtraPath(this.AdditionalPath);
            }
            if (this.QueryParam) {
                this.addQueryParam(this.QueryParam);
            }
        } catch (err) {
            console.log(err);
        }
    }

    public GetFinalURL() {
        try {
            if (Array.isArray(this.URL) && this.URL.length > 0) {
                console.log(this.URL.join(""));
                return this.URL.join("");
                // return this.URL[0];
            }
        } catch (err) {
            console.log(err);
        }
    }

    private buildBaseUrl(urlBaseString: string) {
        try {
            this.URL.push("http://".concat(urlBaseString + "/"));
        } catch (err) {
            console.log(err);
        }
    }

    private AddMainPath(urlMainPathString: string) {
        try {
            this.URL.push(urlMainPathString + "/");
        } catch (err) {
            console.log(err);
        }
    }

    // gestire i casi di aggiunta dell extra path qualcosa fosse presente / non presente il query param e se gli extra path sono piu di uno
    private addExtraPath(additionalPath: string[]) {
        try {
            additionalPath.forEach((elem, i) => {
                if (i === additionalPath.length - 1 && !this.QueryParam) {
                    this.URL.push(elem);
                    return;
                }

                this.URL.push(elem + "/");
            });
        } catch (err) {
            console.log(err);
        }
    }

    private addQueryParam(queryParam: { [key: string]: string }) {
        try {
            const queryString = Object.keys(queryParam)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParam[key])}`)
                .join("&");
            this.URL.push(`?${queryString}`);
        } catch (err) {
            console.log(err);
        }
    }
}

export default URLbuilder;
