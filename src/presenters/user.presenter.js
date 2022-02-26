const presenter = payload => {
    try {
        return parse(payload);
    } catch (error) {
        console.error('Failed to parse user. Error Instance: ', error);

        return null;
    }
};

const parse = payload => ({
    firstName: payload['first_name'],
    lastName: payload['last_name'],
    middleName: payload['middle_name'],
    phoneNumber: payload['phone_number'],
    email: payload['email'],
    refCode: payload['ref_code'],
    isVerified: payload['is_verified'],
    roles: payload['roles'],
    transfersAmount: payload['transfers_amount']
});

export default presenter;