var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Account = require('../entities/account')
    , p = require('../misc/promise')
    , util = require('util')

var Accounts = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.call(this, application, _.extend({ entityName:'Account', entityPlural:'Accounts'}, options));
    },
    newAccount: function (data, options)
    {
        return new Account(this.application, data, options)
    },
    getAccount: function (id, modifiedAfter)
    {
        return this.getAccounts({ id: id, modifiedAfter: modifiedAfter})
            .then(function (accounts)
            {
                return _.first(accounts);
            })
    },
    saveAccounts: function (accounts, options)
    {
        return this.saveEntities(accounts, options)
    },
    getAccounts: function (options)
    {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newAccount(data)};
        return this.getEntities(clonedOptions)
    }
})

module.exports = Accounts;

