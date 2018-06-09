import axios from 'axios';
import {
    configApp
} from '../config'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const searchUrl = `${configApp.proxy+configApp.urlApi}/search?key=${configApp.apiKey}&q=${this.query}`;
        try {
            const res = await axios(searchUrl);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}