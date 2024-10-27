export const userType = {
    customer: 1,
    agent: 2
};

export const AGENT_USER_INFO = {
    userId: 123456,
    userType: userType.agent
};

export const CUSTOMER_USER_INFO = {
    userId: 654321,
    userType: userType.customer
};

// for security made it an env variable 
export const OPENAI_API_KEY = `${import.meta.env.VITE_OPENAI_API_KEY}`;

export const UNSAFE_HTML_TAGS = [
    '<script>',
    '&lt;script&gt;'
];

// Currently, the templates are hardcoded, but in the future, they'll be fetched from the API.
// Then, storing them in the Redux store will be beneficial.
export const MESSAGE_TEMPLATES = [
    {
        id: 'what-is-a-mortgage',
        title: 'What is a mortgage?',
        text: 'A mortgage is a loan used to purchase a home, secured by the property itself.'
    },
    {
        id: 'how-much-can-I-borrow',
        title: 'How much can I borrow?',
        text: 'It depends on your income, credit score, and debts. We can assess your eligibility together, {UserName}.'
    },
    {
        id: 'refinance-my-mortgage',
        title: 'When should I refinance my mortgage?',
        text: 'Consider refinancing when interest rates drop significantly or if your financial situation improves, {UserName}.'
    },
    {
        id: 'mortgage-with-bad-credit',
        title: 'Can I get a mortgage with bad credit?',
        text: 'Consider refinancing when interest rates drop significantly or if your financial situation improves, {UserName}.'
    },
    {
        id: 'closing-costs',
        title: 'What are closing costs?',
        text: 'Closing costs are fees associated with finalizing your mortgage, typically 2-5% of the loan amount.'
    },
    {
        id: 'documents-pre-approval',
        title: 'What documents do I need for pre-approval?',
        text: 'You will need income proof, tax returns, bank statements, and identification.'
    },
];