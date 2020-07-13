function SwarmStorage(fds, account, options) {
    options = options || {};

    this.account = account;
    this.fds = fds;

    this.keyPrefix = options.keyPrefix || '';
    this.indexKey = options.indexKey || 'reduxPersistIndex';
    this.expiration = options.expiration || {};
    if (!this.expiration.default) {
        this.expiration.default = null;
    }

    this.setSwarmOptions = options.setSwarmOptions;

    try {
        const rawFeed = this.fds.Account.SwarmStore.SF.get(account.address, this.keyPrefix);
    } catch (error) {
        console.error('nothing found', error)
    }

    // this.fds.Account.SwarmStore.SF.set(
    //     this.account.address,
    //     this.keyPrefix,
    //     this.account.privateKey,
    //     {})
}

SwarmStorage.prototype.getItem = async function (key, callback) {
    //var item = this.cookies.get(this.keyPrefix + key) || null;
    const rawFeed = await this.fds.Account.SwarmStore.SF.get(this.account.address, this.keyPrefix);
    const feed = JSON.parse(rawFeed)
    const item = feed[key]

    if (callback) {
        callback(null, item);
    }
    return Promise.resolve(item);
}

SwarmStorage.prototype.setItem = async function (key, value, callback) {
    let feed = {}
    try {
        const rawFeed = await this.fds.Account.SwarmStore.SF.get(this.account.address, this.keyPrefix);

        feed = JSON.parse(rawFeed)
        feed[[key]] = value
        //return Promise.resolve(feed);
        const result = await this.fds.Account.SwarmStore.SF.set(
            this.account.address,
            this.keyPrefix,
            this.account.privateKey,
            feed)

        //console.log(feed)
    } catch (error) {
        feed = {}
        feed[key] = value

        await this.fds.Account.SwarmStore.SF.set(
            this.account.address,
            this.keyPrefix,
            this.account.privateKey,
            feed)
    }

    return Promise.resolve(feed);
}

SwarmStorage.prototype.removeItem = async function (key, callback) {

    return this.getAllKeys().then(function (feed) {
        feed = feed.filter(function (k) {
            return k !== key;
        });

        const res = this.fds.Account.SwarmStore.SF.set(
            account.address,
            this.keyPrefix,
            account.privateKey,
            feed)
        if (callback) {
            callback(null);
        }
        return Promise.resolve(null);
    }.bind(this));
}

SwarmStorage.prototype.getAllKeys = async function (callback) {
    const rawFeed = await this.fds.Account.SwarmStore.SF.get(this.account.address, this.keyPrefix);
    const feed = JSON.parse(rawFeed)

    if (callback) {
        callback(null, feed);
    }
    return Promise.resolve(feed);
}

module.exports = SwarmStorage