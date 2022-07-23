/**
 * Represents the tag itself
 * Tags are global (there is only one 'Programming' tag)
 */

class tag {
    constructor( ) {
        this.id = -1;
        this.tag = "";
        this.lastUsed;
        this.ownedBy = -1;
    }
}

exports.emptyTag = () => {
    return new tag();
}

exports.ormTag = (row) => {
    let tag = exports.emptyTag();
    tag.id = row.id;
    tag.tag = row.tag;
    tag.lastUsed = row.last_used;
    tag.ownedBy = row.owned_by;
    return tag;
}