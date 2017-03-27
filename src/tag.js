import {EventEmitter, enableEvent, disableEvent} from './event';

class $$ extends EventEmitter {
    constructor() {
        super();
        this._tags = [];
        Object.defineProperty(this, 'tags', {
            value: this._tags,
            writable: false,
        });
    }

    destroy() {
        this.emit('destroy', this);
        this.removeAllTags();
    }

    hasTag(tag) {
        let tags = this._tags;
        return tags.indexOf(tag) != -1;
    }

    hasTagAny(tags) {
        for (let t of tags) {
            if (this.hasTag(t)) return true;
        }
        return false;
    }

    hasTagAll(tags) {
        for (let t of tags) {
            if (!this.hasTag(t)) return false;
        }
        return true;
    }

    addTag(tag) {
        let tags = this._tags;
        if (this.hasTag(tag)) return this;
        tags.push(tag);
        this.emit('addTag', tag);
        return this;
    }

    addTags(tags) {
        for (let t of tags) {
            this.addTag(t);
        }
        return this;
    }

    removeTag(tag) {
        let tags = this._tags;
        let idx = tags.indexOf(tag);
        if (idx >= 0) {
            tags.splice(idx, 1);
        }
        this.emit('removeTag', tag);
        return this;
    }

    removeTags(tags) {
        for (let t of tags) {
            this.removeTag(t);
        }
        return this;
    }

    removeAllTags() {
        let v = this._tags;
        for (let t of v) {
            this.emit('removeTag', t);
        }
        this._tags = [];
        this.emit('removeAllTags');
        return this;
    }

}

let prototype = $$.prototype;
let Tag = {
    _tags: [],
    hasTag: prototype.hasTag,
    hasTagAny: prototype.hasTagAny,
    hasTagAll: prototype.hasTagAll,
    addTag: prototype.addTag,
    addTags: prototype.addTags,
    removeTag: prototype.removeTag,
    removeTags: prototype.removeTags,
    removeAllTags: prototype.removeAllTags,
};

let enableTag = (obj) => {
    if (obj._tags != undefined) return;
    for (let key of Object.keys(Tag)) {
        obj[key] = Tag[key];
    }
    obj._tags = [];
    Object.defineProperty(obj, 'tags', {
        value: obj._tags,
        writable: false,
    });
    enableEvent(obj);
};

let disableTag = (obj) => {
    for (let key of Object.keys(Tag)) {
        delete obj[key];
    }
    disableEvent(obj);
};

let module = ($, name = 'tag') => {
    $.enableTag = enableTag;
    $.disableTag = disableTag;

    return {
        name: name,
        unuse ($) {
            delete $.enableTag;
            delete $.disableTag;
        },
    };
};

export default $$;
export {$$ as TagObject, enableTag, disableTag, module};
