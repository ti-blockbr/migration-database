const { v4: uuidv4 } = require('uuid');

class InvestorConverter {
    constructor(investor_json) {
        this.investor_json = investor_json;
    }

    convertToUserAccountsTable() {
    const user_account = {
        old_id: this.investor_json.investor_id,
        id: uuidv4(),
        username: this.investor_json.full_name,
        nickname: this.investor_json.full_name,
        password: this.investor_json.password,
        email: this.investor_json.email,
        tax_id: this.investor_json.tax_id,
        mobile_number: this.investor_json.mobile_number,
        kind: `person`,
        type_profile: `investor`,
        last_login: this.investor_json.last_login,
        confirmed_at: this.investor_json.created_at,
        active: true,
        auth_secret_code: this.investor_json.auth_secret_code,
        confirmation_token: uuidv4(),
        provider_id: null,
        provider_name: null,
        indicator_id: null,
        transfer_limit: null,
        created_at: this.investor_json.created_at,
        updated_at: this.investor_json.updated_at,
        deleted_at: null,
        change_email_code: null,
        change_email_expired_at: null,
        password_reminder: null,
        roles: `{"user"} `,
    };
    return user_account;
    }
}

// Sample data to test the InvestorConverter class
module.exports = InvestorConverter

