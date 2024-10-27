import { OPENAI_API_KEY } from './constants';
import { SYSTEM_CONTEXT_SUDGESTION_PROMP, USER_CONTEXT_SENTIMENT_PROMP } from './assistant_promps';
import { openAiEndpoint } from '../endpoints/openAi';

const openAiService = {
    getSuggestedResponse: (customerQuery) => {
        return new Promise((resolve, reject) => {
            const apiBody = {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_CONTEXT_SUDGESTION_PROMP
                    },
                    {
                        role: "user",
                        content: customerQuery
                    },
                ],
                temperature: 0.7
            };

            fetch(openAiEndpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify(apiBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                const response = data?.choices[0]?.message?.content.trim();
                resolve(response);
            }).catch((error) => reject(error));
        }
);},
    getCustomerSentiment: (customerQuery) => {
        return new Promise((resolve, reject) => {
            const apiBody = {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: USER_CONTEXT_SENTIMENT_PROMP
                    },
                    {
                        role: "user",
                        content: customerQuery
                    },
                ],
                temperature: 0.7
            };

            fetch(openAiEndpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify(apiBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                const response = data?.choices[0]?.message?.content.trim();
                resolve(response);
            }).catch((error) => reject(error));
        }
);
    }
};

export default openAiService;