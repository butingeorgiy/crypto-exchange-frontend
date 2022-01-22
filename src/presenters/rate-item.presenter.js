const presenter = payload => {
    try {
        return Array.isArray(payload) ? parseMany(payload) : parseOne(payload);
    } catch (error) {
        console.error('Failed to parse rate item.');

        return [];
    }
};

const parseMany = payload => payload.map(parseOne);

const parseOne = payload => ({
    id: payload['id'],
    cardColor: payload['card_color'],
    entity: {
        id: payload['entity']['id'],
        name: payload['entity']['name'],
        alias: payload['entity']['alias'],
        icon: payload['entity']['icon'],
        cost: payload['entity']['cost'],
        enabled: payload['entity']['enabled']
    }
});

export default presenter;